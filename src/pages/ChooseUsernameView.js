import React, { useState } from "react";
import Auth from "../components/Auth";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { existsUsername } from "../firebase/firebase";
const ChooseUsernameView = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [userName, setUserName] = useState("");
  const handleUserLoggedIn = (user) => {
    navigate("/dashboard");
  };
  const handleUserNotLoggedIn = (user) => {
    // navigate("/choose-username");
    setCurrentUser(user);
    setState(3);
  };
  const handleUserNotRegister = () => {
    navigate("/login");
  };
  const handleInput = (evt) => {
    const { value } = evt.target;
    setUserName(value);
  };
  const handleContinue = async () => {
    if (userName !== "") {
      const exists = await existsUsername(userName);
      if (exists) {
        setState(5);
      } else {
        const tmp = { ...currentUser };
        tmp.processCompleted = true;
      }
    }
  };
  return (
    <div>
      {state === 3 ? (
        <div>
          <div>Bienvenido {currentUser.displayName}</div>
          <div>
            <input type="text" onChange={handleInput} />
          </div>
          <div>
            <button onClick={handleContinue}>Continue</button>
          </div>
        </div>
      ) : (
        <Auth
          onUserLoggedIn={handleUserLoggedIn}
          onUserNotloggedIn={handleUserNotLoggedIn}
          onUserNotRegister={handleUserNotRegister}
        >
          <div>Loading ...</div>
        </Auth>
      )}
    </div>
  );
};

export default ChooseUsernameView;
