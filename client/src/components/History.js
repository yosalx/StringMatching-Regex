import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Search from "./searchHistory";

// list all the record that match the regex

const History = () => {
  const [inputKey, setInputKey] = useState("");
  const [logList, setLogList] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [resultQuery, setResultQuery] = useState([]);

  let result = [];

  function searchFromDatabase(logList) {
    result = [];
    let tipe = Search(inputKey);
    if (tipe.type === "tanggal") {
      let search =
        tipe.data.tahun + "-" + tipe.data.bulan + "-" + tipe.data.tanggal;
      for (let i = 0; i < logList.length; i++) {
        console.log(logList[i].tanggal);
        let checkingDateDB =
          logList[i].tanggal && logList[i].tanggal.substring(0, 10);
        console.log(checkingDateDB);
        if (search === checkingDateDB) {
          result.push(logList[i]);
        }
      }
    } else if (tipe.type === "penyakit") {
      let search = tipe.data.penyakit;
      for (let i = 0; i < logList.length; i++) {
        if (search === logList[i].nama_penyakit) {
          result.push(logList[i]);
        }
      }
    } else if (tipe.type === "tanggalPenyakit") {
      let search =
        tipe.data.tahun + "-" + tipe.data.bulan + "-" + tipe.data.tanggal;
      let penyakit = tipe.data.penyakit;
      for (let i = 0; i < logList.length; i++) {
        var checkingDateDB =
          logList[i].tanggal && logList[i].tanggal.substring(0, 10);
        if (
          search === checkingDateDB &&
          penyakit === logList[i].nama_penyakit
        ) {
          result.push(logList[i]);
        }
      }
    }
    setResultQuery(result);
  }

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`https://backend-website-dnapattern.herokuapp.com/log/`);

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
    // if (Search(inputKey).type === "error") {
    //   window.alert(Search(inputKey).data.error);
    //   return;
    // }
    // let searchType = Search(inputKey).type;
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
    searchFromDatabase(logList);
    console.log(resultQuery);
    console.log(resultQuery.length);
    setResultQuery(result);
    console.log(resultQuery);
    console.log(resultQuery.length);
    setShowHistory(true);
  };

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
      {showHistory && resultQuery.length > 0 ? (
        <>
          {resultQuery.map((result) => (
            <div
              key={result._id}
              className="log"
              style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {result.tanggal.substring(0, 10)} - {result.nama_pengguna} -
              {result.nama_penyakit}- {result.hasil.toString()} -
              {result.kemiripan}%
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
