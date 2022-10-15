import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, userExists } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
const Auth = ({
  children,
  onUserLoggedIn,
  onUserNotloggedIn,
  onUserNotRegister,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          onUserLoggedIn(user);
        } else {
          onUserNotloggedIn(user);
        }
      } else {
        onUserNotRegister();
      }
    });
  }, [navigate, onUserLoggedIn, onUserNotRegister, onUserNotloggedIn]);
  return <div>{children}</div>;
};

export default Auth;
