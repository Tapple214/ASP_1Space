import "../home/Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/navbar";

// TODO: change the thumnail image for each link
// TODO: add side panel with card display, etc.

export default function Home() {
  // To display the data from data retrieved from api
  const [homeData, setHomeData] = useState([]);
  const [pageLinks, setPageLinks] = useState([]);

  // Fetch data from server
  const fetchHomData = async () => {
    try {
      // Wait for axios to fetch the data from http://localhost:3001/
      const res = await axios.get("http://localhost:3001/");
      // To test and see if data is being successfully sent
      console.log(res.data);
      setHomeData(res.data);
      setPageLinks(res.data.Links);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Without dependencies, the effect will run on every render/page refresh
  useEffect(() => {
    fetchHomData();
  }, []);
  return (
    <>
      <NavBar />
      <div className="App p-3">
        <h1>{homeData.Title}</h1>
        <p>{homeData.Subtitle}</p>
        <div>
          {pageLinks.map((link, index) => (
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
          ))}
        </div>
      </div>
    </>
  );
}
