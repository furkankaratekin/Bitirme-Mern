import React from "react";
import WebsitesList from "./pages/WebSitesList";
import SearchInput from "./pages/SearchInput";
import WebSitesContent from "./pages/WebSitesContent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchInput />} />
        <Route path="/websites" element={<WebsitesList />} />
        <Route path="/websites/:id" element={<WebSitesContent />} />{" "}
        {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App
