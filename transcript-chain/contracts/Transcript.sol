// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transcript {
    struct Record {
        string name;
        string studentID;
        string course;
        uint256 gpa;
        bool verified;
    }

    // Map each studentID to its transcript record
    mapping(string => Record) private transcripts;

    // Events for off‑chain tracking
    event TranscriptAdded(string indexed studentID, string name, string course, uint256 gpa);
    event TranscriptVerified(string indexed studentID);

    /// @notice Add a new transcript. Fails if one already exists for this studentID.
    function addTranscript(
        string calldata name,
        string calldata studentID,
        string calldata course,
        uint256 gpa
    ) external {
        // Ensure we don’t overwrite an existing transcript
        require(bytes(transcripts[studentID].studentID).length == 0, "Transcript already exists");

        transcripts[studentID] = Record({
            name: name,
            studentID: studentID,
            course: course,
            gpa: gpa,
            verified: false
        });

        emit TranscriptAdded(studentID, name, course, gpa);
    }

    /// @notice Retrieve a transcript by studentID.
    function getTranscript(string calldata studentID)
        external
        view
        returns (
            string memory name,
            string memory id,
            string memory course,
            uint256 gpa,
            bool verified
        )
    {
        Record storage rec = transcripts[studentID];
        require(bytes(rec.studentID).length != 0, "Transcript not found");

        return (rec.name, rec.studentID, rec.course, rec.gpa, rec.verified);
    }

    /// @notice Mark a transcript as verified.
    function verifyTranscript(string calldata studentID) external {
        Record storage rec = transcripts[studentID];
        require(bytes(rec.studentID).length != 0, "Transcript not found");
        require(!rec.verified, "Already verified");

        rec.verified = true;
        emit TranscriptVerified(studentID);
    }
}
