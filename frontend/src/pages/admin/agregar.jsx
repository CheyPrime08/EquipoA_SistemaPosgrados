import { Button } from "@/components/ui/button";
import grupitoA from "../../components/ui/personas.png";
import grupitoM from "../../components/ui/personas.png";
import grupitoE from "../../components/ui/personas.png";
import leonLogo from "../../components/ui/leon-logo.png";
import "./style.css";

function Agregar() {
  return (
    <div className="agregar">
      <div className="franja-lateral" />

      <div className="div">Agregar</div>
      <div className="text-wrapper-2">Modificar</div>
      <div className="text-wrapper-3">Eliminar</div>

      <img className="grupito-a" alt="Grupito a" src={grupitoA} />
      <img className="grupito-m" alt="Grupito m" src={grupitoM} />
      <img className="grupito-e" alt="Grupito e" src={grupitoE} />
      <img className="leon" alt="Logo León" src={leonLogo} />

      <div className="franja-superior" />

      <div className="text-wrapper-4">SISTEMA GESTION POSGRADOS</div>
      <div className="text-wrapper-5">Administrar Posgrados</div>

      <div className="rectangulo-blanco" />
      <div className="text-wrapper-6">Agregar Posgrado</div>
      <div className="rectangulo-beige" />

      <div className="text-wrapper-7">Correo</div>
      <div className="telefono">Teléfono</div>
      <div className="codigo">Código</div>
      <div className="text-wrapper-8">Nombre del Coordinador</div>
      <div className="text-wrapper-9">Nombre del Posgrado</div>

      <div className="text-posg">
        <div className="text-wrapper-10">Text</div>
      </div>
      <div className="text-cordi">
        <div className="text-wrapper-10">Text</div>
      </div>
      <div className="text-correo">
        <div className="text-wrapper-10">Text</div>
      </div>
      <div className="text-codigo">
        <div className="text-wrapper-10">Text</div>
      </div>
      <div className="text-telefono">
        <div className="text-wrapper-10">Text</div>
      </div>

      <EstadosDefaultWrapper
        className="boton-agr-instance"
        estados="default"
      />
    </div>
  );
}

export default Agregar;
