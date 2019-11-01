import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [project, setProject] = useState([]);
  const [addressChange, setAddressChange] = useState("");
  const [address, setAddress] = useState("");

  const handleChange = e => {
    e.preventDefault();
    setAddressChange(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    setAddress(addressChange);
  };

  useEffect(() => {
    axios
      .get(`localhost:1337/api/${address}`)
      .then(res => {
        setProject(res.data);
      })
      .catch(err => console.log("uh-oh something went awry"));
  });

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        You can interface with the api here! Provide the url extension you're
        looking for and it will render on screen! (GET requests only)
        <input
          type="text"
          name="addressChange"
          placeholder="example: project/3"
          value={addressChange}
          onChange={handleChange}
        />
        <button>Look up info!</button>
      </form>
      {project.map(deets => (
        <div key={deets.id}>
          <h3>{deets.name}</h3>
          <p>{deets.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
