import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Parse from 'parse';
import EventDetailsPage from "./pages/EventDetails";

const App: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    Parse.initialize(
      import.meta.env.VITE_PARSE_APP_ID,
      import.meta.env.VITE_PARSE_JS_KEY
    );
    Parse.serverURL = import.meta.env.VITE_PARSE_SERVER_URL;
  }, []);

  return (
    <Router basename="/website/">
      <div className="app">
        <Header handlePopupToggle={handlePopupToggle} />

        <Routes>
          <Route path="/" element={<Home handlePopupToggle={handlePopupToggle} isPopupOpen={isPopupOpen}/>} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/event/:eventId" element={<EventDetailsPage />} />
        </Routes>

        <Footer handlePopupToggle={handlePopupToggle}/>
      </div>
    </Router>
  );
};

export default App;
