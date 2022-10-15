import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DasboardView from "./pages/DasboardView";
import SignOut from "./pages/SignOut";
import EditProfileView from "./pages/EditProfileView";
import ChooseUsernameView from "./pages/ChooseUsernameView";
import PublicProfileView from "./pages/PublicProfileView";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DasboardView />} />
        <Route path="/dasboard/profile" element={<EditProfileView />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/u/:username" element={<PublicProfileView />} />
        <Route path="/choose-username" element={<ChooseUsernameView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
