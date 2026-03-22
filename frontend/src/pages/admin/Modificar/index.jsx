import { Link } from "react-router-dom";
import grupitoA from "../img/grupo.png";
import grupitoE from "../img/grupo.png";
import grupitoM from "../img/grupo.png";
import leon from "../img/leon.png";
import "./style.css";

export const Modificar = () => {
  return (
       <div className="modificar">
      {/* Menú lateral */}
    
      <div className="franja-lateral">
        <Link to="/agregar" className="menu-opcion">
          <img src={grupitoA} alt="Agregar" />
          <span>Agregar</span>
        </Link>
        <Link to="/editar" className="menu-opcion">
          <img src={grupitoE} alt="Editar" />
          <span>Modificar</span>
        </Link>
        <Link to="/eliminar" className="menu-opcion">
          <img src={grupitoM} alt="Eliminar" />
          <span>Eliminar</span>
        </Link>
      </div>


      <img className="leon" alt="Leon" src={leon} />

      <div className="franja-superior" />

      <div className="text-wrapper-4">SISTEMA GESTION POSGRADOS</div>

      <div className="text-wrapper-5">Administrar Posgrados</div>

      <div className="rectangulo-blanco" />

      <div className="text-wrapper-6">Modificar Posgrado</div>

      <div className="rectangulo-beige" />

      <div className="text-wrapper-7">Correo</div>

      <div className="telefono">Teléfono</div>

      <div className="codigo">Código</div>

      <div className="busqueda">Buscar Posgrado</div>

      <div className="text-wrapper-8">Nombre del Coordinador</div>

      <div className="text-wrapper-9">Nombre del Posgrado</div>

     <div className="text-busqueda">
        <input className="text-wrapper-10" type="tel"  />
      </div>

      <div className="text-posg">
         <input className="text-wrapper-10" type="text"  />
      </div>

     <div className="text-cordi">
        <input className="text-wrapper-10" type="text"  />
      </div>

      <div className="text-correo">
        <input className="text-wrapper-10" type="email"  />
      </div>

      <div className="text-codigo">
        <input className="text-wrapper-10" type="text"  />
      </div>

      <div className="text-telefono">
        <input className="text-wrapper-10" type="tel"  />
      </div>

      <div className="boton-agr"><div className="div-wrapper">Modificar</div></div>

      <div className="boton-bus"><div className="div-wrapper">Buscar</div></div>

      {/* <EstadosDefaultWrapper className="boton-agr-instance" estados="default" /> */}

    </div>
  );
};
