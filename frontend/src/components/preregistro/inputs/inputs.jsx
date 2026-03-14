function Inputs({ placeholder, type }) {
  return (
    <>
      <input
        className="h-15.75 w-123.25 px-5 bg-[#EFE9E3] rounded-2xl placeholder-[#C9B59C] text-[20px] font-medium shadow-xl/10"
        type={type}
        placeholder={placeholder}
      />
    </>
  );
}

export default Inputs;
