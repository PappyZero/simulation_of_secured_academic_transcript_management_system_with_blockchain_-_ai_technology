#!/usr/bin/env python3
import json, os
import pandas as pd
from sklearn.ensemble import IsolationForest
from web3 import Web3

# ─── Config ──────────────────────────────────────────
DATA_PATH       = os.path.join(os.path.dirname(__file__), "..", "data", "transcripts.json")
RPC_URL         = "http://127.0.0.1:8545"
CONTRACT_ADDR   = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
ARTIFACT_PATH   = os.path.join(os.path.dirname(__file__),
                              "..","artifacts","contracts","Transcript.sol","Transcript.json")

# ─── Load & Flag ──────────────────────────────────────────
df = pd.read_json(DATA_PATH)
iso = IsolationForest(contamination=0.1, random_state=42)
df["flag"] = iso.fit_predict(df[["gpa"]])

# ─── Web3 Setup ──────────────────────────────────────────
w3 = Web3(Web3.HTTPProvider(RPC_URL))
if not w3.is_connected():
    raise RuntimeError(f"Could not connect to {RPC_URL}")

with open(ARTIFACT_PATH) as f:
    abi = json.load(f)["abi"]

contract = w3.eth.contract(address=CONTRACT_ADDR, abi=abi)
w3.eth.default_account = w3.eth.accounts[0]

# ─── Add & (Optionally) Verify ──────────────────────────────────
print("⏳ Adding transcripts and verifying clean entries…\n")

for _, row in df.iterrows():
    sid    = row["studentID"]
    name   = row["name"]
    course = row["course"]
    # Scale GPA (e.g. 3.85 -> 385)
    gpa_int= int(row["gpa"] * 100)

    # 1) Add transcript
    try:
        tx = contract.functions.addTranscript(name, sid, course, gpa_int).transact()
        w3.eth.wait_for_transaction_receipt(tx)
        print(f"✓ Added {sid}: {name}, {course}, GPA={row['gpa']}")
    except Exception as e:
        print(f"⚠ Skipped add for {sid} (maybe duplicate): {e}")

    # 2) If flagged clean (==1), verify it
    if row["flag"] == 1:
        try:
            tx = contract.functions.verifyTranscript(sid).transact()
            w3.eth.wait_for_transaction_receipt(tx)
            print(f"  → Verified on-chain: {sid}")
        except Exception as e:
            print(f"  → Failed verify for {sid}: {e}")
    else:
        print(f"  → Anomaly skipped: {sid}")

print("\n✅ Done. Summary of flags:")
print(df[["studentID","gpa","flag"]].to_string(index=False))
