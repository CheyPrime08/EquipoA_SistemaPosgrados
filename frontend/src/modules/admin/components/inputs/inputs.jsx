function InputsAdmin({ type, placeholder, name, value, onChange, className }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={className || "w-full rounded-lg border border-border bg-card p-2"}
    />
  );
}

export default InputsAdmin;