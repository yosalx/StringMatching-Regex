import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import kmp from "./kmp";
import bm from "./bm";
import { useNavigate } from "react-router";
// TODO : add true/false and similary component

const Check = () => {
  // proses bm sama kmp sama similarity
  // return true, false -> similarity
  let dnaString;
  let patternMatch;
  const [nama_pengguna, setName] = useState("");
  const [dna, setDna] = useState("");
  const [nama_penyakit, setDisease] = useState("");
  const [method, setMethod] = useState("kmp");
  const [showResult, setShowResult] = useState(false);
  const tanggal = new Date().toISOString();
  const [hasil, setHasil] = useState(false);
  const [kemiripan, setKemiripan] = useState(0);
  const form = { tanggal, nama_pengguna, nama_penyakit, dna, hasil, kemiripan };
  const navigate = useNavigate();
  const [dnaList, setDnaList] = useState([]);
  const [checkResult, setCheckResult] = useState();
  const currDate =
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    new Date().getDate();

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

  // async function getRecords() {
  //   const response = await fetch(`http://localhost:3000/dna_penyakit/`);

  //   if (!response.ok) {
  //     const message = `An error occurred: ${response.statusText}`;
  //     window.alert(message);
  //     return;
  //   }

  //   const records = await response.json();
  //   setDnaList(records);
  //   console.log("Dna List : " + dnaList);
  // }

  // menangani submit histor
  async function onSubmit(e) {
    // getRecords();
    // Todo : count similarity
    e.preventDefault();
    console.log("submit button clicked");
    const response = await fetch(`http://localhost:3000/dna_penyakit/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const records = await response.json();
    setDnaList(records);
    console.log("Dna List : " + dnaList);
    if (method === "kmp") {
      patternMatch = kmp(dnaList, dna);
      setHasil(patternMatch.bool);
      console.log("patternMatchResult -> " + patternMatch);
    } else {
      patternMatch = bm(dnaList, dna);
      setHasil(patternMatch.bool);
      console.log("patternMatchResult -> " + patternMatch);
    }
    // check if the dna is in the list

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
    setShowResult(true);

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1px",
            }}
          >
            Result : {hasil.toString()}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1px",
            }}
          >
            Kemiripan : {kemiripan}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Check;
