import "./styles/style.css";
import React from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import NewItineraryPage from "./pages/NewItineraryPage";
import { Route, Routes } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/create-itinerary" element={<NewItineraryPage />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
