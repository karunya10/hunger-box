import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MenuPage from "./pages/MenuPage";
import CheckOutPage from "./pages/CheckOutPage";
import AddressBookPage from "./pages/AddressBookPage";
import Header from "./components/Header";
import LoginModal from "./pages/HomePage/LoginModal";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { LocationsProvider } from "./context/locationContext";
import { RestaurantProvider } from "./context/RestaurantContext";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <>
      <Header onLoginClick={() => setShowLoginModal(true)} />
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
      <Routes>
        <Route
          path="/"
          element={
            <LocationsProvider>
              <RestaurantProvider>
                <HomePage />
              </RestaurantProvider>
            </LocationsProvider>
          }
        />
        <Route path="/address" element={<AddressBookPage />} />
        <Route path="/restaurant/:restaurantId" element={<MenuPage />} />
        <Route path="/checkout" element={<CheckOutPage />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
