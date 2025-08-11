import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
  value: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput = ({ onChange, placeholder, ...props }: SearchInputProps) => {
  return (
    <div className="relative w-full max-w-sm">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        {...props}
        onChange={onChange}
        placeholder={placeholder || "Buscar..."}
        className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-300"
      />
    </div>
  );
};

export default SearchInput;
