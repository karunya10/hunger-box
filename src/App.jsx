import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MenuPage from "./pages/MenuPage/MenuPage";
import CheckOutPage from "./pages/CheckoutPage/CheckoutPage";
import AddressBookPage from "./pages/AddressBook/AddressBookPage";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SettingsProvider } from "./context/SettingsContext";
import { LocationsProvider } from "./context/LocationContext";
import { RestaurantProvider } from "./context/RestaurantContext";
import { CartProvider } from "./context/CartContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import AddressFormPage from "./pages/AddressBook/AddressFormPage";
import EditAddressFormPage from "./pages/AddressBook/EditAddressFormPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import CreateCardPage from "./pages/CardsBook/CreateCardPage";
import CardsListPage from "./pages/CardsBook/CardsListPage";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <>
      <SettingsProvider>
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
                <Route path="/address/new" element={<AddressFormPage />} />
                <Route
                  path="/address/edit/:addressId"
                  element={<EditAddressFormPage />}
                />

                <Route
                  path="/menus/:city/:restaurantId"
                  element={<MenuPage />}
                />

                <Route
                  path="/checkout"
                  element={
                    <CheckoutProvider>
                      <CheckOutPage />
                    </CheckoutProvider>
                  }
                />
                <Route
                  path="/orderconfirmation"
                  element={<OrderConfirmationPage />}
                />
                <Route path="/wallet" element={<CardsListPage />} />
                <Route path="/wallet/new" element={<CreateCardPage />} />
              </Routes>
            </CartProvider>
          </RestaurantProvider>
        </LocationsProvider>
      </SettingsProvider>
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
