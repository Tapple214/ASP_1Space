// import "../home/Home.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Login() {
  // To display the data from data retrieved from api
  const [LoginData, setLoginData] = useState({});

  // Fetch data from server
  const fetchLoginData = async () => {
    try {
      // Wait for axios to fetch the data from http://localhost:3001/login
      const res = await axios.get("http://localhost:3001/login");
      // To test and see if data is being successfully sent
      console.log(res.data);
      setLoginData(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Without dependencies, the effect will run on every render/page refresh
  useEffect(() => {
    fetchLoginData();
  }, []);

  return (
    <div className="Login p-3">
      <h1>{LoginData.Title}</h1>
      <p>{LoginData.Subtitle}</p>
      {LoginData.Logo && <img src={LoginData.Logo} alt="Logo" />}
      {LoginData.Rocket && <img src={LoginData.Rocket} alt="Rocket" />}
    </div>
  );
}
