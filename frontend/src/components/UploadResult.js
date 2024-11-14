import React, { useState } from "react";
import axios from "axios";

function UploadResult() {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([{ subject: "", marks: "" }]);

  const handleAddSubject = () => {
    setSubjects([...subjects, { subject: "", marks: "" }]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/admin/upload-result", { name, rollNumber, semester, subjects });
      alert("Result uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <h2>Upload Result</h2>
      <form onSubmit={handleUpload}>
        <input type="text" placeholder="Student Name" onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Roll Number" onChange={(e) => setRollNumber(e.target.value)} required />
        <input type="text" placeholder="Semester" onChange={(e) => setSemester(e.target.value)} required />
        {subjects.map((subject, index) => (
          <div key={index}>
            <input type="text" placeholder="Subject" onChange={(e) => {
              const newSubjects = [...subjects];
              newSubjects[index].subject = e.target.value;
              setSubjects(newSubjects);
            }} required />
            <input type="number" placeholder="Marks" onChange={(e) => {
              const newSubjects = [...subjects];
              newSubjects[index].marks = e.target.value;
              setSubjects(newSubjects);
            }} required />
          </div>
        ))}
        <button type="button" onClick={handleAddSubject}>Add Subject</button>
        <button type="submit">Upload Result</button>
      </form>
    </div>
  );
}

export default UploadResult;
