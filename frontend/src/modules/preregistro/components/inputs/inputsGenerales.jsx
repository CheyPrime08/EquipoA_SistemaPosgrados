//################################################################################
// PArte del input de nombre completo (No se usa)
function NombreInputs({ p, placeholder, type, name }) {
  return (
    <>
      <div>
        <p className="text-[16px] italic font-semibold text-gray-700">{p}</p>
        <input
          className="bg-[#EFE9E3] w-52.75 h-13.75 px-3 rounded-lg mt-2 text-[16px] 
          shadow-[0_6px_12px_rgba(60,40,20,0.15),0_12px_30px_rgba(60,40,20,0.08)] outline-none"
          type={type}
          placeholder={placeholder}
          name={name}
        />
      </div>
    </>
  );
}
export default NombreInputs;

//################################################################################
// PArte del input text
export function InputText({ p, placeholder, type, name, value, onChange }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-[16px] tracking-wider font-semibold text-[#74695a]">
          {p} <span className="text-destructive">*</span>
        </p>
        <input
          className="text-[15px] bg-[#f7f8f9] h-14 w-full rounded-[5px] px-4 outline-none"
          style={{
            boxShadow:
              "inset 5px 5px 15px #D9DADE, inset -5px -5px 6px #FFFFFF",
          }}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}

//################################################################################
// PArte del textarea
export function TextArea({ p, placeholder, type, name, value, onChange }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-[16px] tracking-wider font-semibold text-[#74695a]">
          {p} <span className="text-destructive">*</span>
        </p>
        <textarea
          className="text-[15px] bg-[#f7f8f9] h-14 w-full rounded-[5px] px-4 py-4 outline-none"
          style={{
            boxShadow:
              "inset 5px 5px 15px #D9DADE, inset -5px -5px 6px #FFFFFF",
          }}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export function ElegirPosgrado({
  p,
  placeholder,
  type,
  name,
  value,
  onChange,
}) {
  return (
    <>
      <div className="mt-4">
        <p className="text-[16px] tracking-wider font-semibold text-[#74695a]">
          {p} <span className="text-destructive">*</span>
        </p>
        <select
          className="text-[15px] bg-[#f7f8f9] h-14 w-full rounded-[5px] px-4 py-4 outline-none"
          style={{
            boxShadow:
              "inset 5px 5px 15px #D9DADE, inset -5px -5px 6px #FFFFFF",
          }}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        >
          <option value="">Elige una opción...</option>
          <option value="Posgrado1">Posgrado1</option>
          <option value="Posgrado2">Posgrado2</option>
          <option value="Posgrado3">Posgrado3</option>
          <option value="Posgrado4">Posgrado4</option>
          <option value="Posgrado5">Posgrado5</option>
          <option value="Posgrado6">Posgrado6</option>
          <option value="Posgrado7">Posgrado7</option>
          <option value="Posgrado8">Posgrado8</option>
          <option value="Posgrado9">Posgrado9</option>
          <option value="Posgrado10">Posgrado10</option>
          <option value="Posgrado11">Posgrado11</option>
          <option value="Posgrado12">Posgrado12</option>
          <option value="Posgrado13">Posgrado13</option>
          <option value="Posgrado14">Posgrado14</option>
        </select>
      </div>
    </>
  );
}
