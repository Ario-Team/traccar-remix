import type { DetailedHTMLProps, FC, HTMLAttributes } from "react";

type props = {
  label:
    | DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
    | string;
  full?: boolean;
  disabled?: boolean;
  type: "button" | "submit";
};

const Button: FC<props> = ({ label, full, disabled, type }) => {
  return (
    <button
      className={`mt-7 w-full bg-unalink-blue text-unalink-white font-poppins font-normal text-lg rounded-sm py-3 transition-opacity duration-300 ${
        disabled ? "opacity-50" : "opacity-100"
      }`}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};

Button.defaultProps = { full: true, disabled: false };

export default Button;
