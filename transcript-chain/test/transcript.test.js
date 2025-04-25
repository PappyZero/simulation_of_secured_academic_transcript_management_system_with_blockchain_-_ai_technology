const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Transcript Contract", function () {
  let TranscriptFactory;
  let transcript;

  beforeEach(async function () {
    // Deploy a fresh contract for each test
    TranscriptFactory = await ethers.getContractFactory("Transcript");
    transcript = await TranscriptFactory.deploy();
    await transcript.waitForDeployment();
  });

  it("should add and retrieve a transcript correctly", async function () {
    // Add a transcript and check the event
    await expect(
      transcript.addTranscript("John Doe", "JD123", "Blockchain 101", 385)
    )
      .to.emit(transcript, "TranscriptAdded")
      .withArgs("JD123", "John Doe", "Blockchain 101", 385);

    // Retrieve the transcript
    const record = await transcript.getTranscript("JD123");
    expect(record.name).to.equal("John Doe");
    expect(record.id).to.equal("JD123");
    expect(record.course).to.equal("Blockchain 101");
    expect(record.gpa).to.equal(385);
    expect(record.verified).to.equal(false);
  });

  it("should not allow adding a duplicate transcript", async function () {
    await transcript.addTranscript("Alice", "A100", "Math", 400);
    await expect(
      transcript.addTranscript("Alice", "A100", "Math", 400)
    ).to.be.revertedWith("Transcript already exists");
  });

  it("should revert when retrieving a non-existent transcript", async function () {
    await expect(
      transcript.getTranscript("NONEXISTENT")
    ).to.be.revertedWith("Transcript not found");
  });

  it("should verify a transcript and emit an event", async function () {
    await transcript.addTranscript("Bob", "B200", "Physics", 350);
    await expect(transcript.verifyTranscript("B200"))
      .to.emit(transcript, "TranscriptVerified")
      .withArgs("B200");

    const verifiedRecord = await transcript.getTranscript("B200");
    expect(verifiedRecord.verified).to.equal(true);
  });

  it("should revert when verifying a non-existent transcript", async function () {
    await expect(
      transcript.verifyTranscript("MISSING")
    ).to.be.revertedWith("Transcript not found");
  });

  it("should revert when verifying an already verified transcript", async function () {
    await transcript.addTranscript("Carol", "C300", "Chemistry", 360);
    await transcript.verifyTranscript("C300");
    await expect(
      transcript.verifyTranscript("C300")
    ).to.be.revertedWith("Already verified");
  });
});
