import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'transparent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyles = "cursor-pointer rounded-full font-bold transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-magic-orange text-white hover:bg-magic-orangeDark shadow-lg hover:shadow-xl",
    secondary: "bg-magic-purple text-white hover:opacity-90 shadow-lg",
    outline: "border-2 border-magic-orange text-magic-text hover:bg-magic-orange/10",
    ghost: "text-gray-400 hover:text-white hover:bg-magic-purple",
    transparent: "text-magic-text"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
