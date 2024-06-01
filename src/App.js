import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function App() {
  const [data, setData] = useState([]);
  const getD = () => {
    axios
      .get("https://child.onrender.com/api/sciencefiction")
      .then((response) => {
        setData(response.data);
      });
  };

  return (
    <>
      <div className="cont my">
        <button className="btn-pri" onClick={getD}>
          Fetch News
        </button>
      </div>

      <div className="container">
        <div className="row">
          {data.map((value) => {
            return (
              <div className="col-3">
                <Card style={{ width: "16rem" }}>
                  <Card.Img variant="top" src={value.Image} />
                  <Card.Body>
                    <Card.Title>{value.Title}</Card.Title>
                    <Button variant="primary">{value.Status}</Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
