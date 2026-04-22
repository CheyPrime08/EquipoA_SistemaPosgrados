function Contacto({ p, placeholder, type, name }) {
  return (
    <>
      <div className="mt-5">
        <p className="text-[16px] italic font-semibold text-gray-700">{p}</p>
        <input
          className="bg-[#EFE9E3] w-82 h-13.75 px-3 rounded-lg mt-2 text-[16px] shadow-[0_6px_12px_rgba(60,40,20,0.15),0_12px_30px_rgba(60,40,20,0.08)]"
          type={type}
          placeholder={placeholder}
          name={name}
        />
      </div>
    </>
  );
}

export default Contacto;
