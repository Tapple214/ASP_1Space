// import "../home/Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "../login/Login.css";

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
    <div className="Login h-100 p-3 d-flex flex-column justify-content-center align-items-center">
      <div className="card d-flex flex-row w-75 h-50 rounded-4">
        <div className="rocket-container position-absolute">
          {LoginData.Rocket && (
            <img src={LoginData.Rocket} id="rocket" alt="Rocket" />
          )}
        </div>

        <div className="d-flex flex-column justify-content-center align-items-center mx-auto me-5 pe-5">
          {LoginData.Logo && <img src={LoginData.Logo} id="logo" alt="Logo" />}
          <h1>{LoginData.Title}</h1>
          <p>{LoginData.Subtitle}</p>
        </div>
      </div>
    </div>
  );
}
