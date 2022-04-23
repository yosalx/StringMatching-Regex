import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// list all the record that match the regex

const History = () => {
  const [logList, setLogList] = useState([]);
  const [inputKey, setInputKey] = useState("");

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:3000/log/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setLogList(records);
    }

    getRecords();

    return;
  }, [logList.length]);

  // check if the dna is in the list
  console.log("Semua Log :");
  console.log(logList);

  return (
    <div style={{ marginTop: "30px" }}>
      <h4 style={{ display: "flex", justifyContent: "center", color: "white" }}>
        Testing History
      </h4>
      <Form
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Form.Group
          className="mb-3"
          style={{ color: "white", fontStyle: "italic" }}
        >
          <Form.Label style={{ display: "flex", justifyContent: "center" }}>
            Enter your Keyword
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Search..."
            id="inputKey"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
          />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="success"
              type="submit"
              style={{ display: "flex", justifyContent: "center" }}
            >
              Search
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default History;
