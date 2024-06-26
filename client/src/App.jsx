import React from "react";
import WebsitesList from "./pages/WebSitesList";
import SearchInput from "./pages/SearchInput";
import WebSitesContent from "./pages/WebSitesContent";
import SignIn from "./pages/SignIn";
import SignUp from './pages/SignUp';
import Profile from "./pages/Profile";
import VideosList from "./pages/VideosList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MapSeatch from "./pages/MapSeatch";
import PrivateRoute from "./components/PrivateRoute";
import PictureList from "./pages/PictureList";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<SearchInput />} />
        <Route path="/websites" element={<WebsitesList />} />
        <Route path="/websites/:id" element={<WebSitesContent />} />{" "}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/videos" element={<VideosList />} />
        <Route path="/maps" element={<MapSeatch />} />
        <Route path="/pictures" element={<PictureList />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* Add this line */}
      </Routes>
      
    </Router>
  );
}

export default App;
