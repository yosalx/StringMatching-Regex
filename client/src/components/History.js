import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Search from "./searchHistory";

// list all the record that match the regex

const History = () => {
  const [logList, setLogList] = useState([]);
  const [inputKey, setInputKey] = useState("");
  const [showHistory, setShowHistory] = useState(false);

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
    console.log("Log List : " + logList);

    return;
  }, [logList.length]);

  const onSearch = (e) => {
    e.preventDefault();
    console.log(inputKey);
    if (Search(inputKey).type === "error") {
      window.alert(Search(inputKey).data.error);
      return;
    }
    let searchType = Search(inputKey).type;
    // if (searchType === "tanggal") {
    //   let fbulan = Search(inputKey).data.bulan;
    //   let ftahun = Search(inputKey).data.tahun;
    //   let ftanggal = Search(inputKey).data.tanggal;
    //   const response = fetch(
    //     `http://localhost:3000/log/${tanggal + bulan + tahun}`,
    //     {
    //       method: "GET",
    //       body: JSON.stringify({
    //         tanggal: ftanggal,
    //         bulan: fbulan,
    //         tahun: ftahun,
    //       }),
    //     }
    //   );
    //   if (!response.ok) {
    //     const message = `An error occurred: ${response.statusText}`;
    //     window.alert(message);
    //     return;
    //   }
    //   const records = response.json();
    //   console.log(records);
    // }
    setShowHistory(true);
  };

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
        onSubmit={onSearch}
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
      {showHistory && logList.length > 0 ? (
        <>
          {logList.map((log) => (
            <div
              key={log._id}
              className="log"
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {log.tanggal} - {log.nama_pengguna} - {log.nama_penyakit} -{" "}
              {log.hasil} - {log.kemiripan}
            </div>
          ))}
        </>
      ) : (
        <div
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          No History to Show
        </div>
      )}
    </div>
  );
};

export default History;
