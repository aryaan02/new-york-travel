import React from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import NewItineraryPage from "./pages/NewItineraryPage";
import { Route, Routes } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  // const [user, setUser] = useState(null);
  // const [loggedIn, setLoggedIn] = useState(false);

  return (
    <ChakraProvider>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage
              // loggedIn={loggedIn}
              // setUser={setUser}
              // setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/account"
            element={
              <AccountPage
              //   userInfo={user}
              //   setLoggedIn={setLoggedIn}
              //   loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/create-itinerary"
            element={
              <NewItineraryPage
              // userInfo={user}
              // setLoggedIn={setLoggedIn}
              // loggedIn={loggedIn}
              />
            }
          />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
