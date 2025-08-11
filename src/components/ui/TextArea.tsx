interface TextAreaProps {
  label?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  value: string;
  rows: number;
  className?: string;
}

export default function TextArea({
  label,
  error,
  onChange,
  className = "",
  ...props
}: TextAreaProps) {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <textarea
        {...props}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-gray-300 focus:ring-blue-300"
        } ${className}`}
        onChange={onChange}
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
