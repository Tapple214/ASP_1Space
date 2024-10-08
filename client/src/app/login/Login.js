import { useEffect, useState } from "react";
import axios from "axios";
import "../login/Login.css";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// To enable cross-origin cookies
axios.defaults.withCredentials = true;

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({});

  // Fetch data from server
  const fetchLoginData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/");
      setLoginData(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchLoginData();
  }, []);

  // Handle Google login success
  const handleLoginSuccess = async (response) => {
    try {
      // Get the JWT token
      const credential = response.credential;
      // Decode the token
      const decodedToken = jwtDecode(credential);

      // Extract user information
      const email = decodedToken.email;
      const name = decodedToken.name;

      // Send token to backend for authentication
      await axios.post("http://localhost:3001/authenticate", {
        idToken: credential,
        email: email,
        name: name,
      });

      // Redirect to main display page
      navigate("/main");
    } catch (error) {
      console.error("Error handling login:", error);
    }
  };

  // Handle Google login error
  const handleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="login h-100 p-3 d-flex flex-column justify-content-center align-items-center">
      <div className="card d-flex flex-row w-75 h-50 rounded-5">
        <div className="rocket-container position-absolute">
          <img src="/images/rocket.png" id="rocket" alt="Rocket" />
        </div>

        <div className="login-message d-flex flex-column justify-content-center align-items-center mx-auto">
          <img src="/images/logo.png" id="logo" alt="Logo" />

          <h1>Welcome to 1Space</h1>
          <p>Login to begin your adventure</p>

          <div className="d-flex flex-column justify-content-center align-items-center text-center">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
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
