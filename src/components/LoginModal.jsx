import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInWithGoogle, signUp, login } from "@/config/firebase";
import { useState } from "react";

export default function LoginModal({ open, onOpenChange }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(userName, password);
      onOpenChange(false);
      toast.success("Login Successful", {
        description: "Welcome back!",
        duration: 3000,
      });
    } catch (error) {
      toast.error(error.message, {
        duration: 3000,
      });
    }
  };
  const handleLoginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      onOpenChange(false);
      toast.success("Login Successful", {
        description: "Welcome back!",
        duration: 3000,
      });
    } catch (error) {
      toast.error(error.message, {
        duration: 3000,
      });
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(userName, password);
      onOpenChange(false);
      toast.success("SignUp Successful", {
        description: "Welcome!",
        duration: 3000,
      });
    } catch (error) {
      toast.error(error.message, {
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Login to Your Account</DialogTitle>
          <DialogDescription>
            Enter your credentials or login with Google
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>

          <Button
            className="w-full"
            variant="outline"
            onClick={handleLoginWithGoogle}
          >
            Login with Google
          </Button>

          <Button className="w-full" variant="outline" onClick={handleSignUp}>
            Sign Up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
