export function Eleccion({ p, placeholder, type, name }) {
  return (
    <>
      <div className="mt-4">
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

export function ElegirPosgrado({ name }) {
  return (
    <>
      <div className="mt-4">
        <p className="text-[16px] italic font-semibold text-gray-700">
          POSGRADO DE INTERÉS
        </p>
        <select
          className="bg-[#EFE9E3] w-82 h-13.75 px-3 rounded-lg mt-2 text-[16px] shadow-[0_6px_12px_rgba(60,40,20,0.15),0_12px_30px_rgba(60,40,20,0.08)]"
          name={name}
          id="Posgrado"
        >
          <option value="">ELIGE UNA OPCIÓN...</option>
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

export function InputExplicar({ name }) {
  return (
    <>
      <div className="mt-5">
        <p className="text-[16px] italic font-semibold text-gray-700">
          ¿PORQUÉ SU OPCIÓN DEL POSGRADO?
        </p>
        <textarea
          className="bg-[#EFE9E3] w-174.5 h-47.5 px-3 py-2 rounded-lg mt-2 text-[16px] resize-none shadow-[0_6px_12px_rgba(60,40,20,0.15),0_12px_30px_rgba(60,40,20,0.08)]"
          placeholder="ESCRIBA SU EXPLICACIÓN..."
          name={name}
        ></textarea>
      </div>
    </>
  );
}

export function InputEsUDG({ name }) {
  return (
    <>
      <div
        className="bg-[#EFE9E3] flex font-bold text-[#605445] text-[16px] h-13.75 w-45
        justify-between items-center rounded-lg px-4 shadow-[0_6px_12px_rgba(60,40,20,0.15),0_12px_30px_rgba(60,40,20,0.08)]"
      >
        <div className="flex gap-2 justify-center items-center">
          <label htmlFor="ESUDG_SI">SI</label>
          <input
            className="w-7 h-7 cursor-pointer border-none outline-none"
            type="radio"
            name={name}
            id="ESUDG_SI"
            value="true"
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <label htmlFor="ESUDG_NO">NO</label>
          <input
            className="w-7 h-7 cursor-pointer"
            type="radio"
            name={name}
            id="ESUDG_NO"
            value="false"
          />
        </div>
      </div>
    </>
  );
}
