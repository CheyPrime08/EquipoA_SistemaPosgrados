import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useState, useMemo, useCallback, useEffect } from "react";
import "../../../styles/admin/tabla.css";
import { getPosgrados, actualizarPreregistro } from "@/api/posgrados.api";

function Tabla() {
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Cargar posgrados del backend al montar el componente
  useEffect(() => {
    getPosgrados().then((posgrados) => {
      setData(posgrados);
    });
  }, []);

  // Función para manejar cambios en el preregistro
  const handlePreregistroChange = useCallback((rowData, newValue) => {
    actualizarPreregistro(rowData.nombre_db, newValue);
    setData(prevData => {
      const newData = [...prevData];
      const rowIndex = newData.findIndex(item => item.codigo === rowData.codigo);
      if (rowIndex !== -1) {
        newData[rowIndex].preregistro = newValue;
      }
      return newData;
    });
  }, []);

  // Filtrar datos según búsqueda
  const datosFiltr = useMemo(() =>
    data.filter(row =>
      (row.posgrado || "").toLowerCase().includes(busqueda.toLowerCase()) ||
      (row.cordinador || "").toLowerCase().includes(busqueda.toLowerCase()) ||
      (row.codigo || "").toLowerCase().includes(busqueda.toLowerCase()) ||
      (row.preregistro || "").toLowerCase().includes(busqueda.toLowerCase())
    ), [data, busqueda]
  );

  // Columnas
  const columns = useMemo(() => [
    {
      header: "Posgrado",
      accessorKey: "posgrado",
    },
    {
      header: "Coordinador",
      accessorKey: "cordinador",
    },
    {
      header: "Código",
      accessorKey: "codigo",
    },
    {
      header: "Preregistro",
      accessorKey: "preregistro",
      cell: ({ row }) => (
        <select
          value={row.original.preregistro || "Cerrado"}
          onChange={(e) => handlePreregistroChange(row.original, e.target.value)}
          className="preregistro-select"
        >
          <option value="Abierto">Abierto</option>
          <option value="Cerrado">Cerrado</option>
        </select>
      ),
    },
  ], [handlePreregistroChange]);

  const table = useReactTable({ data: datosFiltr, columns, getCoreRowModel: getCoreRowModel() });

  return (
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
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tabla;