import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  type,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-semibold focus:outline-none transition-colors duration-200 cursor-pointer";

  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
      type={type || "button"}
    >
      {children}
    </button>
  );
};

export default Button;
