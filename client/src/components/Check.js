import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import kmpMatch from "./kmp";
import bmMatch from "./bm";
import { useNavigate } from "react-router";
// TODO : add true/false and similary component

const Check = () => {
  // proses bm sama kmp sama similarity
  // return true, false -> similarity
  let dnaString;
  const [nama_pengguna, setName] = useState("");
  const [dna, setDna] = useState("");
  const [nama_penyakit, setDisease] = useState("");
  const [method, setMethod] = useState("kmp");
  const [showResult, setShowResult] = useState(false);
  const tanggal = new Date().toISOString();
  const hasil = true;
  const kemiripan = 0.5;
  const form = { tanggal, nama_pengguna, nama_penyakit, dna, hasil, kemiripan };
  const navigate = useNavigate();

  const currDate =
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    new Date().getDate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nama_pengguna);
    console.log(nama_penyakit);
    console.log(method);
    console.log(dna);
    setShowResult(true);
  };

  const showFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setDna(text);
      console.log(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  // menangani submit histor
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newLog = { ...form };

    await fetch("http://localhost:3000/log/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLog),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    navigate("/");

    console.log("Form submitted");
    console.log("data :");
    console.log(newLog);
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <h4
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Test Your DNA Here
      </h4>
      <Form
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        onSubmit={onSubmit}
      >
        <Form.Group
          className="mb-3"
          style={{ color: "white", fontStyle: "italic" }}
        >
          <Form.Label style={{ display: "flex", justifyContent: "center" }}>
            Enter your Name
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name..."
            value={nama_pengguna}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <Form.Label style={{ display: "flex", justifyContent: "center" }}>
            Enter your Sequence DNA
          </Form.Label>
          <Form.Control
            required
            type="file"
            value={dnaString}
            onChange={showFile}
          />
          <br />
          <Form.Label style={{ display: "flex", justifyContent: "center" }}>
            Enter your Prediction
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Disease..."
            value={nama_penyakit}
            onChange={(e) => setDisease(e.target.value)}
          />
          <br />
          <Form.Label style={{ display: "flex", justifyContent: "center" }}>
            Pattern Matching Metho
          </Form.Label>
          <Form.Select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="kmp">Knuth-Morris-Pratt (KMP)</option>
            <option value="bm">Boyer-Moore (BM)</option>
          </Form.Select>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="success"
              type="submit"
              style={{ display: "flex", justifyContent: "center" }}
            >
              Submit
            </Button>
          </div>
        </Form.Group>
      </Form>
      {showResult ? (
        <div style={{ color: "white" }}>
          <br />
          <h4
            style={{
              display: "flex",
              justifyContent: "center",
              fontWeight: "bold",
            }}
          >
            Your Result
          </h4>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            Name : {nama_pengguna}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1px",
            }}
          >
            Date : {currDate}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1px",
            }}
          >
            Disease : {nama_penyakit}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Check;
