import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import classes from "./SignUp.module.css";
import { auth } from "../../utility/firebase";
import { BeatLoader } from "react-spinners";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { setPersistence, browserLocalPersistence } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  setPersistence(auth, browserLocalPersistence)
    .then(() => console.log("Persistence enabled"))
    .catch((error) => console.error("Persistence error:", error));

  const handleAuthSuccess = (userCredential) => {
    const user = userCredential.user;
    dispatch(
      loginUser({
        uid: user.uid,
        email: user.email,
      })
    );

    // Navigate to the protected route or home
    const from = location.state?.from || "/";
    navigate(from, { replace: true });
  };

  const handleer = async (e) => {
    e.preventDefault();
    setError("");
    const action = e.target.name;

    if (action === "signIn") {
      setLoadingSignIn(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          handleAuthSuccess(userCredential);
          setError("Sign in successful! ✅");
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => setLoadingSignIn(false));
    } else if (action === "signUp") {
      setLoadingSignUp(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          handleAuthSuccess(userCredential);
          setError("Sign up successful! 🎉");
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => setLoadingSignUp(false));
    }
  };

  return (
    <div className={classes.container}>
      <Link to="/">
        <img
          src="https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png"
          alt=""
          width={200}
        />
      </Link>
      <div className={classes.form}>
        <h2>Sign in to Amazon</h2>
        {error && <p className={classes.errorMessage}>{error}</p>}
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={classes.input}
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={classes.input}
        />

        <button
          name="signIn"
          onClick={handleer}
          className={classes.signInBtn}
          disabled={loadingSignIn}
        >
          {loadingSignIn ? <BeatLoader /> : "Sign In"}
        </button>

        <p>New to Amazon?</p>
        <button
          onClick={handleer}
          name="signUp"
          className={classes.signUpBtn}
          disabled={loadingSignUp}
        >
          {loadingSignUp ? <BeatLoader /> : "Create Your Amazon Account"}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
