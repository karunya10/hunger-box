import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import CheckOutPage from "./pages/CheckOutPage";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import { useState } from "react";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <>
      <Header onLoginClick={() => setShowLoginModal(true)}  />
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurant/:restaurantId" element={<MenuPage />} />
        <Route path="/checkout" element={<CheckOutPage />} />
      </Routes>
    </>
  );
}

export default App;
