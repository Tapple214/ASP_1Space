import "../home/Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/navbar";

export default function Home() {
  //   // To display the data from data retrieved from api
  //   const [homeData, setHomeData] = useState([]);
  //   const [pageLinks, setPageLinks] = useState([]);

  //   // Fetcch data from server
  //   const fetchHomData = async () => {
  //     try {
  //       // Wait for axios to fetch the data from http://localhost:3001/
  //       const res = await axios.get("http://localhost:3001/");
  //       console.log(res.data);
  //       setHomeData(res.data);
  //       setPageLinks(res.data.Links);
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };

  //   // Withou dependencies, the effect will run on every render/page refresh
  //   useEffect(() => {
  //     fetchHomData();
  //   }, []);
  return (
    <div className="App p-3">
      <NavBar></NavBar>
      {/* <h1 className="">{homeData.Title}</h1>
      <p>{homeData.Subtitle}</p>

      <div className="page-link-container">
        {pageLinks.map((link, index) => (
          <div className="card my-3 py-3" key={index}>
            <a href={link.url}>{link.name}</a>
            <p>{link.description}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
}
