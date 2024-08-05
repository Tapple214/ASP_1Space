// import "../home/Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "../login/Login.css";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

// TODO: implement data retrieval after db is set up

export default function Login() {
  const navigate = useNavigate();

  // To display the data from data retrieved from api
  const [LoginData, setLoginData] = useState({});

  const handleLoginSuccess = async (credentialResponse) => {
    if (credentialResponse?.credential) {
      const idToken = credentialResponse.credential;
      console.log("ID Token:", idToken);

      try {
        await axios.post("http://localhost:3001/authenticate", {
          idToken,
        });
        console.log("Token sent successfully");

        // Redirect to the home page after successful login
        navigate("/Home");
      } catch (error) {
        console.error("Error sending token:", error);
      }
    } else {
      console.log("No credential received.");
    }
  };

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
    <div className="login h-100 p-3 d-flex flex-column justify-content-center align-items-center">
      <div className="card d-flex flex-row w-75 h-50 rounded-5">
        <div className="rocket-container position-absolute">
          {LoginData.Rocket && (
            <img src={LoginData.Rocket} id="rocket" alt="Rocket" />
          )}
        </div>

        <div className="login-message d-flex flex-column justify-content-center align-items-center mx-auto">
          {LoginData.Logo && <img src={LoginData.Logo} id="logo" alt="Logo" />}
          <h1>{LoginData.Title}</h1>
          <p>{LoginData.Subtitle}</p>

          <div className="d-flex flex-column justify-content-center align-items-center text-center">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
            />

            <br />

            <p className="disclaimer px-5">
              By clicking continue, you agree to sharing your name and email
              with 1Space.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
