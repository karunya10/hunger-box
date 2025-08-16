import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MenuPage from "./pages/MenuPage/MenuPage";
import CheckOutPage from "./pages/CheckOutPage";
import AddressBookPage from "./pages/AddressBook/AddressBookPage";
import Header from "./components/Header";
import LoginModal from "./pages/HomePage/LoginModal";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { LocationsProvider } from "./context/locationContext";
import { RestaurantProvider } from "./context/RestaurantContext";
import { CartProvider } from "./context/CartContext";
import AddressForm from "./pages/AddressBook/AddressForm";
import EditAddressForm from "./pages/AddressBook/EditAddressForm";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <>
      <LocationsProvider>
        <RestaurantProvider>
          <CartProvider>
            <Header onLoginClick={() => setShowLoginModal(true)} />
            <LoginModal
              open={showLoginModal}
              onOpenChange={setShowLoginModal}
            />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/address" element={<AddressBookPage />} />
              <Route path="/address/new" element={<AddressForm />} />
              <Route
                path="/address/edit/:addressId"
                element={<EditAddressForm />}
              />
              <Route path="/menus/:city/:restaurantId" element={<MenuPage />} />
              <Route path="/checkout" element={<CheckOutPage />} />
            </Routes>
          </CartProvider>
        </RestaurantProvider>
      </LocationsProvider>
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
