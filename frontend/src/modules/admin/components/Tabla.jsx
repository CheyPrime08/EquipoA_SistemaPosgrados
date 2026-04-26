import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useState } from "react";
import "../../../styles/admin/tabla.css";

function Tabla(){
  // Datos de ejemplo
  const [data, setData] = useState([
    { posgrado: "Maestría en Computación", cordinador: "Dr. Pérez", codigo: "MC01", preregistro: "Abierto" },
    { posgrado: "Doctorado en Sistemas", cordinador: "Dra. López", codigo: "DS02", preregistro: "Cerrado" },
  ]);

  // Función para manejar cambios en el preregistro
  const handlePreregistroChange = (rowIndex, newValue) => {
    const newData = [...data];
    newData[rowIndex].preregistro = newValue;
    setData(newData);
  };

  const columns = [
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
          onChange={(e) => handlePreregistroChange(row.index, e.target.value)}
          className="preregistro-select"
        >
          <option value="Abierto">Abierto</option>
          <option value="Cerrado">Cerrado</option>
        </select>
      )
    }
  ]
   const table = useReactTable({data, columns, getCoreRowModel: getCoreRowModel()})
    return(
        <div className="tabla-container">
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