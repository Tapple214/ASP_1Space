import "../home/Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/navbar";

// To enable cross-origin cookies
axios.defaults.withCredentials = true;

// TODO: change the thumbnail image for each link
// TODO: add side panel with card display, etc.

export default function Home() {
  // To display the data from data retrieved from API
  const [homeData, setHomeData] = useState({});
  const [pageLinks, setPageLinks] = useState([]);

  // Fetch data from server
  const fetchHomeData = async () => {
    try {
      // Wait for axios to fetch the data from http://localhost:3001/home
      const res = await axios.get("http://localhost:3001/home");
      // To test and see if data is being successfully sent
      console.log("hpme data", res.data);
      setHomeData(res.data);
      setPageLinks(res.data.Links || []);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Without dependencies, the effect will run on every render/page refresh
  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="App p-3">
        <h1>{homeData.Title || "Loading..."}</h1>
        <p>{homeData.Subtitle || ""}</p>
        <div>
          {pageLinks.length > 0 ? (
            pageLinks.map((link, index) => (
              <div className="card my-3 d-flex flex-row" key={index}>
                <img className="thumbnail" src={link.img} alt={link.alt}></img>
                <div className="d-flex flex-column justify-content-center ms-2">
                  <h4>
                    <a
                      href={link.url}
                      className="text-black text-decoration-none"
                    >
                      {link.name}
                    </a>
                  </h4>
                  <p>{link.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No links available</p>
          )}
        </div>
      </div>
    </>
  );
}
