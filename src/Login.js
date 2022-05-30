import React from "react";
import avatar from "./images/avatar.webp";
import google from "./icons/google.png";
import mail from "./icons/mail.jpg";
import { auth, provider } from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { DataBucket } from "./DataLayer";
import { GoogleAuthProvider } from "firebase/auth";
import {useNavigate} from 'react-router-dom'


function Login() {
  const [, dispatch] = DataBucket();
  //const provider = new GoogleAuthProvider();

  const navigate = useNavigate()


  async function handleGoogleLogin() {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (result && credential) {
      //EXTRACTING THE USER'S FIRSTNAME
      const displayName = result.user.displayName;
      const _username = displayName.substr(displayName.indexOf(" ") + 1);
      const username = `${_username.charAt().toUpperCase()}${_username.slice(
        1
      )}`;
      console.log(username);
      dispatch({
        type: "TOKEN",
        token: credential.accessToken,
      });
      dispatch({
        type: "USERNAME",
        username: username,
      });
      console.log(credential.accessToken);
      //console.log(user);
      console.log(username);
      navigate('/game')
    }

  }

  return (
    <div className="login-main">
      <img src={avatar} alt="" className="avatar" />
      <div className="authentication-div">
        <div className="google-auth" onClick={handleGoogleLogin}>
          <img src={google} alt="" />
          <h4>Sign In With Google</h4>
        </div>
        <div className="email-auth">
          <img src={mail} alt="" />
          <h4>Sign In With Email</h4>
        </div>
      </div>
    </div>
  );
}

export default Login;
