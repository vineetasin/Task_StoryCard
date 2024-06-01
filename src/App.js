import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Details from "./Details";
import Navbar from "./Navbar";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          "https://child.onrender.com/api/sciencefiction"
        );
        console.log("Fetched data:", response.data); // Debugging: log the fetched data
        let filteredResponse = response.data.filter(
          (r) => r.Title !== undefined
        );
        setData(filteredResponse);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="MainC">
                <div>
                  <h1 className="title">
                    <b>Science Fiction Stories</b>
                  </h1>
                </div>
                <div className="btnS">
                  <button className="new">New</button>
                  <button className="pro">In Progress</button>
                  <button className="comp">Completed</button>
                  <button className="clr">Clear All</button>
                </div>
              </div>

              {loading && (
                <div className="loading">
                  <Spinner animation="border" />
                  <span>Loading...</span>
                </div>
              )}

              {error && <div className="error">{error}</div>}

              <div className="container">
                <div className="row">
                  {data.map((value, index) => (
                    <div className="col-3" key={index}>
                      <div className="card p-2">
                        <img
                          className="card-img"
                          src={`https://ik.imagekit.io/dev24/${value.Image}`}
                          alt={value.Title}
                        />
                        <h2 className="card-title">{value.Title}</h2>
                        <Link to={`/details/${value._id}`}>
                          <button
                            className="btn-primary "
                            style={{
                              color:
                                value?.Status === "In Progress"
                                  ? "orange"
                                  : value?.Status === "New"
                                  ? "blue"
                                  : value?.Status === "Completed"
                                  ? "green"
                                  : "pink",
                              fontWeight: 600,
                            }}
                          >
                            {value?.Status}
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          }
        />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
