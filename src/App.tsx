import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Parse from "parse";
import EventDetailsPage from "./pages/EventDetails";
import { HelmetProvider } from "react-helmet-async";

const App: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    // Only initialize Parse if environment variables are available
    if (import.meta.env.VITE_PARSE_APP_ID && 
        import.meta.env.VITE_PARSE_JS_KEY && 
        import.meta.env.VITE_PARSE_SERVER_URL) {
      Parse.initialize(
        import.meta.env.VITE_PARSE_APP_ID,
        import.meta.env.VITE_PARSE_JS_KEY
      );
      Parse.serverURL = import.meta.env.VITE_PARSE_SERVER_URL;
    }
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <div className="app min-h-screen flex flex-col justify-between">
          <Header handlePopupToggle={handlePopupToggle} />

          <Routes>
            <Route
              path="/"
              element={
                <Home
                  handlePopupToggle={handlePopupToggle}
                  isPopupOpen={isPopupOpen}
                />
              }
            />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route
              path="/event/:eventId"
              element={
                <EventDetailsPage
                  isPopupOpen={isPopupOpen}
                  handlePopupToggle={handlePopupToggle}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
