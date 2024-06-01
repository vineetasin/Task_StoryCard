import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./App.css";

function Details() {
  const { id } = useParams();
  const [storyData, setStoryData] = useState(null);
  const [wordExplorerData, setWordExplorerData] = useState([]);
  const [storyAdventureData, setStoryAdventureData] = useState([]);
  const [brainQuestData, setBrainQuestData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("wordExplorer");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://child.onrender.com/api/sciencefiction/${id}`
        );
        console.log("Fetched data:", response.data); // Debugging: log the fetched data
        setStoryData(response.data);
        setWordExplorerData(response.data.wordExplorer || []);
        setStoryAdventureData(response.data.storyAdventure || []);
        setBrainQuestData(response.data.brainQuest || []);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {storyData && (
        <div>
          <h1>{storyData.title}</h1>
          <div>
            <p>{storyData.description}</p>
          </div>
          <div className="button-group">
            <button
              className={`tab-button ${
                activeTab === "wordExplorer" ? "active" : ""
              }`}
              onClick={() => setActiveTab("wordExplorer")}
            >
              Word Explorer
            </button>
            <button
              className={`tab-button ${
                activeTab === "storyAdventure" ? "active" : ""
              }`}
              onClick={() => setActiveTab("storyAdventure")}
            >
              Story Adventure
            </button>
            <button
              className={`tab-button ${
                activeTab === "brainQuest" ? "active" : ""
              }`}
              onClick={() => setActiveTab("brainQuest")}
            >
              Brain Quest
            </button>
          </div>
          <div className="tab-content">
            {activeTab === "wordExplorer" && (
              <div className="tab-section">
                {wordExplorerData.map((item, index) => (
                  <div key={index} className="card">
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "storyAdventure" && (
              <div className="tab-section">
                {storyAdventureData.map((item, index) => (
                  <div key={index} className="card">
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "brainQuest" && (
              <div className="tab-section">
                {brainQuestData.map((item, index) => (
                  <div key={index} className="card">
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
