# Secured Academic Transcript System Leveraging Blockchain and AI

## Objective
To design and develop a decentralized Academic Transcript Management System using blockchain for enhanced security and artificial intelligence (AI) for fast and secure access.

## Simulation Type
Blockchain Simulation / Distributed Systems Simulation

## Types of Dataset
1. Academic transcript data
2. University records

## Possible Sources for Dataset
1. Institutional data (simulated)
2. Blockchain data

## Dataset URLs
- (Custom-simulated datasets required for transcripts and security features)

---

## Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (v16+)
- npm
- Python 3.8+ (with `pip` and `venv`)
- Git
- Ubuntu 24.04 LTS (or a similar Linux distribution)

---

## Project Structure
```bash
transcript-chain/
├── contracts/             # Solidity contracts
├── scripts/               # Deployment & simulation scripts
│   ├── deploy.js
│   ├── simulate.js
│   ├── generate_dataset.py
│   └── anomaly_verify.py
├── test/                  # Mocha/Chai unit tests
├── data/                  # Simulated transcript JSON data
├── artifacts/             # Hardhat-generated build artifacts
├── hardhat.config.js      # Hardhat configuration
├── package.json           # npm dependencies and scripts
├── requirements.txt       # Python dependencies
└── README.md              # Project documentation
```

---

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd transcript-chain
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox ethers
   ```

3. **Install Python dependencies**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install pandas scikit-learn web3
   ```

4. **Compile smart contracts**
   ```bash
   npx hardhat compile
   ```

5. **Generate synthetic dataset**
   ```bash
   python3 scripts/generate_dataset.py
   ```
   This creates `data/transcripts.json` with 100 mock student records.

---

## Running the Project

1. **Start a local blockchain node**
   ```bash
   npx hardhat node
   ```

2. **Deploy the smart contract**
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```
   - Copy the deployed contract address from the console.

3. **Run unit tests**
   ```bash
   npx hardhat test
   ```

4. **Simulate on-chain workflow**
   ```bash
   npx hardhat run scripts/simulate.js --network localhost
   ```

5. **Detect anomalies and verify transcripts**
   ```bash
   python3 scripts/anomaly_verify.py
   ```
   - This script reads the synthetic dataset, flags outliers by GPA, adds all entries on-chain, and verifies only the “clean” ones.

---

## Expected Outputs

- **Smart contract address** printed during deployment.
- **Transaction logs** from `simulate.js` showing add/get/verify stages.
- **Anomaly detection summary** from `anomaly_verify.py` indicating which studentIDs were verified.

---

## Background Studies

### Blockchain Technology
A decentralized ledger system that ensures data integrity, transparency, and security. Here, it secures academic transcript records across institutions.

### Smart Contracts
Self-executing code on the blockchain that automates the transcript verification workflow, eliminating intermediaries.

### AI for Anomaly Detection
Machine learning models (e.g., Isolation Forest) analyze GPAs to detect potential forgeries before on-chain verification.

### Distributed Ledger Systems
Multiple nodes (universities) participate in maintaining the ledger, ensuring tamper-proof, distributed record-keeping.

### Data Integrity & Security
Combines cryptographic immutability of blockchain with AI-driven checks to prevent unauthorized changes.

### Speed of Access
Blockchain enables rapid, verifiable access to transcripts without manual delays.

### Forged Transcript Detection
AI algorithms flag inconsistencies or outliers in transcript data, enhancing trust.

### Decentralized Systems
Control and data custody are shared across institutions, avoiding a single point of failure.
