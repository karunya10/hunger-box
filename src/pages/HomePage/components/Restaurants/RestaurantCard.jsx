import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { LocationsContext } from "@/context/LocationContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import LoginModal from "@/components/LoginModal";
import { Star } from "lucide-react";

export default function RestaurantCard({ image, name, cuisines, rating, id }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { selectedLocation: city } = useContext(LocationsContext);

  const handleRestaurantCardClick = () => {
    user !== null ? navigate(`/menus/${city}/${id}`) : setShowLoginModal(true);
  };

  return (
    <>
      <Card
        className="w-full shadow-md hover:shadow-xl transition-shadow py-0 pb-5 cursor-pointer"
        onClick={handleRestaurantCardClick}
      >
        <CardHeader className="p-0">
          <img
            src={image}
            alt={name}
            className="w-full h-[180px] object-cover rounded-t-md"
          />
        </CardHeader>
        <CardContent className="space-y-1">
          <CardTitle className="text-lg">{name}</CardTitle>
          <p className="text-muted-foreground text-sm">
            {cuisines.slice(0, 4).join(" • ")}
          </p>
          <div className="pt-1">
            <span
              className="
              inline-flex items-center gap-1.5 text-sm font-medium
              text-emerald-700 bg-emerald-50
              px-2.5 py-1 rounded-full
              ring-1 ring-emerald-100
            "
            >
              <Star className="w-4 h-4 fill-emerald-700 stroke-emerald-700" />
              {rating}
            </span>
          </div>
        </CardContent>
      </Card>
      {showLoginModal && (
        <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
      )}
    </>
  );
}
