import React, { useEffect, useState } from "react";
import AccountCircle from "./assets/account-circle.svg";
import "./App.css";
import axios from "axios";

const aspects = [
  "Aspek Penilaian 1",
  "Aspek Penilaian 2",
  "Aspek Penilaian 3",
  "Aspek Penilaian 4",
];
const colleges = [
  "Mahasiswa 1",
  "Mahasiswa 2",
  "Mahasiswa 3",
  "Mahasiswa 4",
  "Mahasiswa 5",
  "Mahasiswa 6",
  "Mahasiswa 7",
  "Mahasiswa 8",
  "Mahasiswa 9",
  "Mahasiswa 10",
];

const App = () => {
  // Declaration State to catch option
  const [state, setState] = useState({});

  // Download json
  const downloadJson = () => {
    axios.post("http://localhost:8000/json-download", state)
    .then((res) => {
      const contentType = 'application/json';
      const fileName = 'mahasiswa.json'
      const content = res.data;
      var a = document.createElement("a");
      var file = new Blob([content], {type: contentType});
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
    })
  };

  // Function String to object format
  const stringToObject = (data) => data.replaceAll(" ", "_").toLowerCase();

  // For handle select option 
  const _handleChangeValue = (e, college, aspect) => {
    const value = e.target.value;
    const aspect_key = stringToObject(aspect);
    const college_key = stringToObject(college);
    setState((prevState) => ({
      ...prevState,
      [aspect_key]: {
        ...prevState[aspect_key],
        [college_key]: parseInt(value),
      },
    }));
  };

  // Initialize state
  useEffect(() => {
    const results = {};
    aspects.forEach((aspect) => {
      let tempAspect = {};
      const aspect_key = stringToObject(aspect);
      colleges.forEach((college) => {
        const college_key = stringToObject(college);
        tempAspect[college_key] = 1;
      });
      results[aspect_key] = tempAspect;
    });

    setState(results);
  }, []);

  // Return render component
  return (
    <div className="app-wrapper">
      <h1 className="title">Aplikasi Penilaian Mahasiswa</h1>
      {colleges.map((college, keyCol) => (
        <div key={keyCol} className="college_row">
          <div className="college_col">
            <img src={AccountCircle} alt={college} className="avatar" />
            {college}
          </div>
          {aspects.map((aspect, aspectKey) => (
            <div className="college_col col-center" key={aspectKey}>
              <select
                className="form-control"
                onChange={(e) => _handleChangeValue(e, college, aspect)}
              >
                {[...Array(10).keys()].map((value) => (
                  <option key={value + 1}>{value + 1}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ))}
      <div className="simpan-container">
        <button className="simpan-button" onClick={downloadJson}>Simpan</button>
      </div>
    </div>
  );
};

export default App;
