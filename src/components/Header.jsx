import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className="w-full px-4 py-2 border-b flex items-center justify-between">
      <div className="flex-1">
        <span className="text-xl font-bold">🍔</span>
      </div>

      <div className="flex-1 text-center">
        <h1 className="text-lg font-medium">Platr</h1>
      </div>

      <div className="flex-1 flex justify-end">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
          <AvatarFallback>FD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
