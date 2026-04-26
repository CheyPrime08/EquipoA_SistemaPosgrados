import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export const Inputs = React.forwardRef(
  ({ placeholder, type, name, className, value, onChange, ...rest }, ref) => {
    return (
      <input
        {...rest}
        ref={ref}
        className={className}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    );
  },
);

export const PhoneField = React.forwardRef(
  (
    { className, value, placeholder, onChange, country = "MX", ...rest },
    ref,
  ) => {
    return (
      <PhoneInput
        {...rest}
        ref={ref}
        international
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultCountry={country}
        maxLength={16}
      />
    );
  },
);
