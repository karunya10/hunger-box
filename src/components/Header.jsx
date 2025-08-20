import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOutUser } from "@/config/firebase";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings";

export default function Header({ onLoginClick }) {
  const [user] = useAuthState(auth);
  const avatarUrl = user ? user.photoURL : "";

  const navigate = useNavigate();

  return (
    <header
      className="w-full px-4 py-5 border-b flex items-center justify-between  sticky top-0 z-50"
      style={{ backgroundColor: "#FF6B5E" }}
    >
      <div className="flex-1" onClick={() => navigate("/")}>
        <img
          src="/logo.svg"
          alt="Hunger-Box"
          className="h-10 w-auto object-contain"
        />
      </div>

      <div className=" flex gap-4 justify-center items-center">
        <Settings />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={avatarUrl}
                alt="@user"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <AvatarFallback>
                <img
                  src="https://github.com/shadcn.png"
                  alt="fallback avatar"
                />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {user === null ? (
              <DropdownMenuItem onClick={onLoginClick}>
                Sign-in
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={signOutUser}>
                Sign-out
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/address")}>
              Address Book
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/wallet")}>
              Wallet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
