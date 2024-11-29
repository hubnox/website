import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Popup from "./components/Popup";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Parse from 'parse';
import CreatorEventsPage from "./pages/CreatorsEvents";
import EventDetailsPage from "./pages/EventDetails";

const App: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    Parse.initialize(
      import.meta.env.VITE_PARSE_APP_ID,
      import.meta.env.VITE_PARSE_JS_KEY
    );
    Parse.serverURL = import.meta.env.VITE_PARSE_SERVER_URL;
  }, []);

  const togglePopup = (): void => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <Router>
      <div className="app">
        <Header onRequestAccess={togglePopup} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/creator/:creatorId" element={<CreatorEventsPage />} />
          <Route path="/event/:eventId" element={<EventDetailsPage />} />
        </Routes>

        <Footer />

        <Popup isOpen={isPopupOpen} onClose={togglePopup}>
          <h2 className="popup__title">
            Get <span>Hubnox</span> App
          </h2>
          <p>
            Scan the QR code to join our community of early adopters or
            <a
              className="ea-link-popup"
              target="_blank"
              href="https://tally.so/r/mOLDA7"
              rel="noopener noreferrer"
            >
              click here
            </a>
          </p>
          <img src="/assets/images/qr-code.png" alt="QR Code" />
        </Popup>
      </div>
    </Router>
  );
};

export default App;
