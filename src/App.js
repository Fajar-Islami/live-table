import React, { useState, useEffect } from "react";
import Datatable from "./datatable";

require("es6-promise").polyfill();
require("isomorphic-fetch");

const App = () => {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");

  // Cari First Name dan email
  const [searchColumns, setSearchColumns] = useState(["firstName", "lastName"]);

  // Fetch Data
  useEffect(() => {
    fetch("https://devmentor.live/api/examples/contacts?api_key=dca16df4")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  // Live Search dari
  function search(rows) {
    // Dipakai klo mau cari semua
    // const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter(
      (row) =>
        // Pencarian Firstname dan lastname
        searchColumns.some((column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1),

      // some == kayak or
      // toString() == agar bisa, karena tidak semua kolomnya string
      // columns.some((column) => row[column].toString().toLowerCase().indexOf(q.toLowerCase) > -1),
    );
  }

  const columns = data[0] && Object.keys(data[0]);

  return (
    <div>
      <div>
        <h2>Find Data</h2>
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
        {/* User mencari berdasarkan kolom */}
        {columns &&
          columns.map((column, i) => (
            <label key={i} style={{ marginLeft: "10px" }}>
              <input
                style={{ marginRight: "10px" }}
                type="checkbox"
                checked={searchColumns.includes(column)}
                onChange={(e) => {
                  const chekced = searchColumns.includes(column);
                  // Arrow function memberika previous state
                  // klo di check bisa remove dari search
                  setSearchColumns((prev) => (chekced ? prev.filter((sc) => sc !== column) : [...prev, column]));
                }}
              />
              {column}
            </label>
          ))}
      </div>
      <Datatable data={search(data)} />
      {/* <TabelTes /> */}
    </div>
  );
};

export default App;
