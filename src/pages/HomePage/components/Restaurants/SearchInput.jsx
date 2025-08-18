import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10 bg-slate-100"
      />
    </div>
  );
};

export default SearchInput;
