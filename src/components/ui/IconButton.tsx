import React from "react";

interface IconButtonProps {
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
}

const IconButton = ({
  onClick,
  ariaLabel,
  children,
  className,
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`p-2 rounded-full bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
