"use client";

import { useEffect, useState } from "react";
import "./page.css"; // ✅ your custom CSS file

export default function Page() {
  const [clusters, setClusters] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [customers, setCustomers] = useState([]);

  // Fetch cluster data on page load
  useEffect(() => {
    fetch("http://127.0.0.1:5000/clusters")
      .then((res) => res.json())
      .then((data) => setClusters(data));
  }, []);

  // Handle "View" click
  const handleClusterClick = (clusterObj) => {
    setSelectedCluster(clusterObj);

    fetch(`http://127.0.0.1:5000/customers?cluster=${clusterObj.cluster}`)
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  };

  return (
    <div>
      <h1>🛍️ Customer Segmentation Dashboard</h1>

      <h2>📊 Cluster Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Cluster</th>
            <th>Customers</th>
            <th>Avg Income (k$)</th>
            <th>Avg Spending</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clusters.map((c) => (
            <tr key={c.cluster}>
              <td>{c.cluster}</td>
              <td>{c.count}</td>
              <td>{c.avg_income}</td>
              <td>{c.avg_score}</td>
              <td>
                <button onClick={() => handleClusterClick(c)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCluster && (
        <>
          <h2>🧑 Customers in Cluster {selectedCluster.cluster}</h2>
                   <div
            style={{
              backgroundColor: "#fff3cd",
              color: "#856404",
              padding: "1rem",
              borderRadius: "5px",
              marginTop: "1rem",
              border: "1px solid #ffeeba",
            }}
          >
            <strong>📌 Strategy for Cluster {selectedCluster.cluster}:</strong>
            <p>{selectedCluster.strategy}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Income</th>
                <th>Spending</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((cust, i) => (
                <tr key={i}>
                  <td>{cust.CustomerID}</td>
                  <td>{cust.Gender}</td>
                  <td>{cust.Age}</td>
                  <td>{cust["Annual Income (k$)"]}</td>
                  <td>{cust["Spending Score (1-100)"]}</td>
                </tr>
              ))}
            </tbody>
          </table>


        </>
      )}
    </div>
  );
}
