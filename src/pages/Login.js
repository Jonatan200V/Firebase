import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, userExists } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Auth from "../components/Auth";
const Login = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [state, setState] = useState(0);
  /*  state = 1 Cargando
    state = 2 Login completo
    state = 3 Registrado pero no logeado
    state = 4 Logout */
  const navigate = useNavigate();
  const handleClick = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);
  };

  const signInWithGoogle = async (googleProvider) => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUserLoggedIn = (user) => {
    navigate("/dashboard");
  };
  const handleUserNotLoggedIn = (user) => {
    navigate("/choose-username");
  };
  const handleUserNotRegister = () => {
    setState(4);
  };
  return (
    <div>
      {state === 1 ? (
        <div>Loading...</div>
      ) : state === 2 ? (
        <div>Esta Registrado</div>
      ) : state === 3 ? (
        <div>Estas autenticado pero no registrado</div>
      ) : state === 4 ? (
        <button onClick={handleClick}>Login</button>
      ) : (
        <Auth
          onUserLoggedIn={handleUserLoggedIn}
          onUserNotloggedIn={handleUserNotLoggedIn}
          onUserNotRegister={handleUserNotRegister}
        >
          <div>Loading...XXX</div>
        </Auth>
      )}
    </div>
  );
};

export default Login;
