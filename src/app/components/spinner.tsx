import React from "react";

interface SpinnerProps {
  color?: string;
  size?: "xsm" | "sm" | "md" | "lg" | "xl";
}

const Spinner = ({ color, size }: SpinnerProps) => {
  const spinnerColor = color ? color : "white";
  const spinnerChart = {
    xsm: "h-3 w-3",
    sm: "h-5 w-5",
    md: "h-9 w-9",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <>
      <div
        className={`inline-block mx-2 ${
          spinnerChart[size ? size : "sm"]
        }  text-${spinnerColor} animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </>
  );
};

export default Spinner;
