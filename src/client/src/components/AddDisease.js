import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AddDisease() {
  const showFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setForm({ nama: form.nama, dna: text });
      console.log(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  const [form, setForm] = useState({
    nama: "",
    dna: "",
  });

  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newDisease = { ...form };
    // check regex dna
    const reDNA = new RegExp(/^[ATCG]+$/);
    if (reDNA.test(newDisease.dna)) {
      await fetch("https://backend-website-dnapattern.herokuapp.com/dna_penyakit/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDisease),
      }).catch((error) => {
        window.alert(error);
        return;
      });
    } else {
      window.alert("DNA tidak valid, harus berupa karakter ATCG");
      return;
    }

    setForm({ nama: "", dna: "" });
    navigate("/");

    console.log("Form submitted");
    console.log("data :");
    console.log(newDisease);
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div style={{ marginTop: "30px" }}>
      <h4 style={{ display: "flex", justifyContent: "center", color: "white" }}>
        Add Disease
      </h4>
      <Form
        onSubmit={onSubmit}
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Form.Group
          className="mb-3"
          style={{ color: "white", fontStyle: "italic" }}
        >
          <Form.Label style={{ display: "flex", justifyContent: "center" }}>
            Enter The Disease Name
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name..."
            id="nama"
            value={form.nama}
            onChange={(e) => updateForm({ nama: e.target.value })}
          />
          <br />
          <Form.Label style={{ display: "flex", justifyContent: "center" }}>
            Input The Sequence DNA
          </Form.Label>
          <Form.Control required type="file" id="dna" onChange={showFile} />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="success"
              type="submit"
              style={{ display: "flex", justifyContent: "center" }}
            >
              Add
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}
