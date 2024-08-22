import "../home/Home.css";
import { useEffect, useState } from "react";
import axios from "axios";

import hacksAndFacts from "../../components/json/hacksAndFacts.json";
import food from "../../components/json/food.json";
import shop from "../../components/json/shop.json";
import place from "../../components/json/place.json";

import ChartDisplay from "../../components/chart/chart";

// To enable cross-origin cookies
axios.defaults.withCredentials = true;

export default function Home({ handlePageChange, homeFinanceData }) {
  // To display the data from data retrieved from API
  const [homeData, setHomeData] = useState({});
  const [pageLinks, setPageLinks] = useState([]);
  const [randomItem, setRandomItem] = useState(null);
  const [randomDeal, setRandomDeal] = useState(null);

  // Function to get a random item from the JSON data
  const getRandomItem = () => {
    const allItems = [
      ...hacksAndFacts.study_hacks,
      ...hacksAndFacts.life_hacks,
      ...hacksAndFacts.fun_facts,
    ];
    const randomIndex = Math.floor(Math.random() * allItems.length);
    return allItems[randomIndex];
  };

  // Function to get a random deal from the JSON data
  const getRandomDeal = () => {
    const allDeals = [...food, ...shop, ...place];
    if (allDeals.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * allDeals.length);
    return allDeals[randomIndex];
  };

  // Fetch data from server
  const fetchHomeData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/home");
      setHomeData(res.data);
      setPageLinks(res.data.Links || []);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchHomeData();
    setRandomItem(getRandomItem());
    setRandomDeal(getRandomDeal());
  }, []);

  return (
    <div
      className="App row p-3 d-flex flex-row col-12"
      style={{ width: "95vw" }}
    >
      {/* Left section */}
      <div className="col-lg-8 col-md-8 col-xs-12 ps-2">
        <h1>{homeData.Title || "Loading..."}</h1>
        <p>{homeData.Subtitle || ""}</p>
        <div>
          {pageLinks.length > 0 ? (
            pageLinks.map((link, index) => (
              <div
                className="card my-3 d-flex flex-row rounded-4 pe-3"
                key={index}
                onClick={() => handlePageChange(link.url)}
                style={{ cursor: "pointer" }}
              >
                <img
                  className="thumbnail rounded-4"
                  src={link.img}
                  alt={link.alt}
                ></img>
                <div className="d-flex flex-column justify-content-center ms-2">
                  <h4>{link.name}</h4>
                  <p>{link.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No links available</p>
          )}
        </div>
      </div>

      {/* Right section */}
      <div className="col-lg-4 col-md-4 col-xs-12 ps-4">
        <div
          className="card quote-display p-3 rounded-4 text-center"
          style={{ fontSize: "13px" }}
        >
          <p className="fw-bold" style={{ color: "#6248a8" }}>
            Thought of the day!
          </p>
          {randomItem ? (
            <>
              <h5 style={{ fontSize: "15px" }}>
                {randomItem.name || randomItem.fact}
              </h5>
              <p className="m-0 opacity-50">{randomItem.description}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div>
          <ChartDisplay financialData={homeFinanceData} />
        </div>

        {/* Deal preview */}
        <div
          className="card rounded-4 mt-4 p-2"
          style={{ cursor: "pointer", maxHeight: "425px" }}
          onClick={() => handlePageChange("budget-hub")}
        >
          {randomDeal ? (
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ fontSize: "10px" }}
            >
              <p className="fw-bold text-center" style={{ fontSize: "15px" }}>
                {randomDeal.name}
              </p>
              <img
                src={randomDeal.image}
                alt={randomDeal.alt}
                width={100}
                height={100}
                className="mb-3 rounded-4"
              />
              <p className="mx-3 text-center">{randomDeal.description}</p>
              <p className="text-center">
                <span className="fw-bold">Location:</span>
                <br />
                {randomDeal.location}
              </p>
              <p className="text-center">
                <span className="fw-bold">Opening Times:</span>
                <br />
                {randomDeal.details}
              </p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
