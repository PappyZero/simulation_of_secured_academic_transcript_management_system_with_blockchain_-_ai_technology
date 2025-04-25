// scripts/simulate.js
const { ethers } = require("hardhat");

async function main() {
  // 1. Attach to your deployed contract
  const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const Transcript = await ethers.getContractFactory("Transcript");
  const transcript = await Transcript.attach(address);

  // 2. Add a new transcript
  console.log("Adding transcript for Alice (ID: A100) …");
  let tx = await transcript.addTranscript(
    "Alice Johnson",
    "A100",
    "Blockchain 101",
    385  // In our contract GPA is uint256; if you want a decimal, multiply, e.g. 3.85→385
  );
  await tx.wait();
  console.log("✅ Transcript added");

  // 3. Fetch it back
  console.log("Fetching transcript A100 …");
  let rec = await transcript.getTranscript("A100");
  // rec is [ name, studentID, course, gpa, verified ]
  console.log({
    name: rec[0],
    studentID: rec[1],
    course: rec[2],
    gpa: rec[3].toString(),
    verified: rec[4],
  });

  // 4. Verify the transcript
  console.log("Verifying transcript A100 …");
  tx = await transcript.verifyTranscript("A100");
  await tx.wait();
  console.log("✅ Transcript verified");

  // 5. Fetch again to see the `verified` flag
  rec = await transcript.getTranscript("A100");
  console.log("Post-verification record:", {
    name: rec[0],
    studentID: rec[1],
    course: rec[2],
    gpa: rec[3].toString(),
    verified: rec[4],
  });
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
