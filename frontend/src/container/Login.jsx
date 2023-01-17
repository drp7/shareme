import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle, fcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { client } from "../client";
import { useState } from "react";
export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const responseGoogle = async (response) => {
    setLoading(true);
    localStorage.setItem("user", JSON.stringify(response.data));
    const { name, sub: googleId, picture } = response.data;
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: picture,
    };

    await client.createIfNotExists(doc);
    navigate("/", {
      replace: true,
    });
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center flex-col  h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          autoPlay
          loop
          muted
          className="object-cover w-full h-full  "
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-blackOverlay">
          <div className="p-5 flex flex-col items-center gap-3">
            <img src={logo} alt="logo" width="130px" className="" />
            <div id="login" className="shadow-2xl ">
              <LoginSocialGoogle
                client_id={process.env.REACT_APP_GOOGLE_API_TOKEN}
                scope="openid profile email"
                discoveryDocs="claims_supported"
                access_type="offline"
                // onResolve={({ provider, data }) => {
                //   console.log(provider, data);
                // }}
                // onReject={(err) => {
                //   console.log(err);
                // }}
                onResolve={responseGoogle}
                onReject={responseGoogle}
              >
                <GoogleLoginButton />
              </LoginSocialGoogle>
            </div>
            {loading && (
              <p className="text-white">Logging you in ! Please Wait...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
