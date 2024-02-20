import React from "react";
import WebsitesList from "./pages/WebSitesList";
import SearchInput from "./pages/SearchInput";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchInput />} />
        <Route path="/websites" element={<WebsitesList />} />
      </Routes>
    </Router>
  );
}

export default App
