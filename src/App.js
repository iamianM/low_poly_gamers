import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { useWallet } from "./components/Network/useWallet";

import CharacterEditor from "./components/CharacterEditor";
import Footer from "./components/Footer";

function App() {
  const { currentAccount, setCurrentAccount } = useWallet();
  return (
    <>
      <Router>
        <Header
          currentAccount={currentAccount}
          setCurrentAccount={setCurrentAccount}
        />
      </Router>
      <CharacterEditor />
      <Footer />
    </>
  );
}

export default App;
