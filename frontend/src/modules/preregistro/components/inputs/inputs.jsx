function Inputs({ placeholder, type, name }) {
  return (
    <>
      <input
        className="h-12 md:h-15.75 w-full sm:w-123.25 px-5 bg-[#EFE9E3] rounded-2xl placeholder-[#C9B59C] text-base md:text-[20px] 
        font-medium shadow-xl/10 outline-none focus:ring-2 focus:ring-[#C9B59C] transition-all"
        type={type}
        placeholder={placeholder}
        name={name}
      />
    </>
  );
}

export default Inputs;
