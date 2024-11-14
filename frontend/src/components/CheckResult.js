// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./CheckResult.css";

// function CheckResult() {
//   const [name, setName] = useState("");
//   const [rollNumber, setRollNumber] = useState("");
//   const [semester, setSemester] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [showForm, setShowForm] = useState(true);
//   const navigate = useNavigate();

//   const handleCheckResult = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/student/check-result", { name, rollNumber, semester });
//       if (response.data) {
//         setResult(response.data);
//         setError("");
//         setShowForm(false);
//       } else {
//         setError("Result not found.");
//         setResult(null);
//       }
//     } catch (err) {
//       setError("Error fetching result. Please try again.");
//       setResult(null);
//     }
//   };

//   const handleBack = () => {
//     setResult(null);
//     setError("");
//     setShowForm(true);
//   };

//   return (
//     <div className="check-result">
//       {showForm ? (
//         <form onSubmit={handleCheckResult}>
//           <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
//           <input type="text" placeholder="Roll Number" onChange={(e) => setRollNumber(e.target.value)} required />
//           <input type="text" placeholder="Semester" onChange={(e) => setSemester(e.target.value)} required />
//           <button type="submit">Check Result</button>
//         </form>
//       ) : (
//         <div className="result-container">
//           <h3>Result for {result.name}</h3>
//           <p>Roll Number: {result.roll_number}</p>
//           <p>Semester: {result.semester}</p>
//           <table className="result-table">
//             <thead>
//               <tr>
//                 <th>Subject</th>
//                 <th>Marks</th>
//               </tr>
//             </thead>
//             <tbody>
//               {result.subjects.map((subject, index) => (
//                 <tr key={index}>
//                   <td>{subject.subject}</td>
//                   <td>{subject.marks}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button onClick={handleBack} className="back-button">Back</button>
//         </div>
//       )}
//       {/* <button onClick={() => navigate("/")} className="back-button">Back to Home</button> */}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// }

// export default CheckResult;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./CheckResult.css";

function CheckResult() {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [semester, setSemester] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();

  const handleCheckResult = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/student/check-result", { name, rollNumber, semester });
      if (response.data) {
        setResult(response.data);
        setError("");
        setShowForm(false);
      } else {
        setError("Result not found.");
        setResult(null);
      }
    } catch (err) {
      setError("Error fetching result. Please try again.");
      setResult(null);
    }
  };

  const handleBack = () => {
    setResult(null);
    setError("");
    setShowForm(true);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Result for ${result.name}`, 10, 10);
    doc.text(`Roll Number: ${result.roll_number}`, 10, 20);
    doc.text(`Semester: ${result.semester}`, 10, 30);

    const tableData = result.subjects.map((subject) => [
      subject.subject,
      subject.marks,
    ]);

    doc.autoTable({
      head: [["Subject", "Marks"]],
      body: tableData,
      startY: 40,
    });

    doc.save("result.pdf");
  };

  return (
    <div className="check-result">
      {showForm ? (
        <form onSubmit={handleCheckResult}>
          <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
          <input type="text" placeholder="Roll Number" onChange={(e) => setRollNumber(e.target.value)} required />
          <input type="text" placeholder="Semester" onChange={(e) => setSemester(e.target.value)} required />
          <button type="submit">Check Result</button>
        </form>
      ) : (
        <div className="result-container">
          <h3>Result for {result.name}</h3>
          <p>Roll Number: {result.roll_number}</p>
          <p>Semester: {result.semester}</p>
          <table className="result-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.subject}</td>
                  <td>{subject.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleBack} className="back-button">Back</button>
          <button onClick={handleDownloadPDF} className="download-button">Download as PDF</button>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default CheckResult;
