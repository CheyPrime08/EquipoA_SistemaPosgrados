import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useState, useMemo, useCallback, useEffect } from "react";
import "../../../styles/admin/tabla.css";

function Tabla(){
  // Clave para localStorage
  const STORAGE_KEY = "tabla_posgrados_data";

  // Cargar datos de localStorage o usar datos por defecto
  const datosIniciales = () => {
    const datosGuardados = localStorage.getItem(STORAGE_KEY);
    if (datosGuardados) {
      return JSON.parse(datosGuardados);
    }
    return [
      { posgrado: "Maestría en Computación", cordinador: "Dr. Pérez", codigo: "MC01", preregistro: "Abierto" },
      { posgrado: "Doctorado en Sistemas", cordinador: "Dra. López", codigo: "DS02", preregistro: "Cerrado" },
    ];
  };

  // Datos de ejemplo
  const [data, setData] = useState(datosIniciales());

  // Estado para la búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Guardar datos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Función para manejar cambios en el preregistro
  const handlePreregistroChange = useCallback((rowData, newValue) => {
    setData(prevData => {
      const newData = [...prevData];
      const rowIndex = newData.findIndex(item => item.codigo === rowData.codigo);
      if (rowIndex !== -1) {
        newData[rowIndex].preregistro = newValue;
      }
      return newData;
    });
  }, []);

  // Función para filtrar los datos según la búsqueda (memoizada)
  const datosFiltr = useMemo(() =>
    data.filter(row =>
      row.posgrado.toLowerCase().includes(busqueda.toLowerCase()) ||
      row.cordinador.toLowerCase().includes(busqueda.toLowerCase()) ||
      row.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
      row.preregistro.toLowerCase().includes(busqueda.toLowerCase())
    ), [data, busqueda]
  );

  // Columnas memoizadas
  const columns = useMemo(() => [
    {
      header: "Posgrado",
      accessorKey: "posgrado"
    },
    {
      header: "Cordinador",
      accessorKey: "cordinador"
    },
    {
      header: "Codigo",
      accessorKey: "codigo"
    },
    {
      header: "Preregistro",
      accessorKey: "preregistro",
      cell: ({ row }) => (
        <select
          value={row.original.preregistro}
          onChange={(e) => handlePreregistroChange(row.original, e.target.value)}
          className="preregistro-select"
        >
          <option value="Abierto">Abierto</option>
          <option value="Cerrado">Cerrado</option>
        </select>
      )
    }
  ], [handlePreregistroChange]);
   const table = useReactTable({data: datosFiltr, columns, getCoreRowModel: getCoreRowModel()})
    return(
        <div className="tabla-container">
            <div className="busqueda-container">
              <input
                type="text"
                placeholder="🔍 Buscar posgrado, coordinador, código o estado..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="busqueda-input"
              />
            </div>
            <table>
                <thead>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key = {headerGroup.id}>
                                {
                                    headerGroup.headers.map(header => (
                                        <th key={header.id}>
                                            {
                                            flexRender(header.column.columnDef.header, header.getContext())
                                            }

                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id}> 
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td key={cell.id}> 
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))
                                }
                            </tr>
        
                        ))
                    }
                </tbody>

            </table>
        </div>
    )
}
export default Tabla