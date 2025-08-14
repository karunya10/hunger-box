import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/config/firebase";

export default function LoginModal({ open, onOpenChange }) {
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
          <Input placeholder="Username" />
          <Input placeholder="Password" type="password" />

          <Button className="w-full">Login</Button>

          <Button
            className="w-full"
            variant="outline"
            onClick={async () => {
              await signInWithGoogle();
              onOpenChange(false);
            }}
          >
            Login with Google
          </Button>

          <Button className="w-full" variant="secondary" disabled>
            Sign Up (Coming Soon)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
