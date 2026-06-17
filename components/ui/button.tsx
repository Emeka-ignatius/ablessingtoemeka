import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', ...props }, ref) => {
    const baseStyle = "px-6 py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 transform active:scale-95 cursor-pointer";
    const variants = {
      primary: "bg-space-rose text-white shadow-lg shadow-space-rose/20 hover:bg-space-rose/90 hover:-translate-y-0.5",
      outline: "border border-space-gold/50 text-space-gold-light hover:bg-space-gold/10",
    };
    return (
      <button
        ref={ref}
        className={`${baseStyle} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
