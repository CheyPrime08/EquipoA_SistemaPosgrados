function NombreInputs({ p, placeholder, type, name }) {
  return (
    <>
      <div>
        <p className="text-[16px] italic font-semibold text-gray-700">{p}</p>
        <input
          className="bg-[#EFE9E3] w-52.75 h-13.75 px-3 rounded-lg mt-2 text-[16px] 
          shadow-[0_6px_12px_rgba(60,40,20,0.15),0_12px_30px_rgba(60,40,20,0.08)]"
          type={type}
          placeholder={placeholder}
          name={name}
        />
      </div>
    </>
  );
}
export default NombreInputs;
