import React, { useState } from 'react';
import { CoordTable } from '../common/CoordTable';
import { AspiranteRow } from './AspiranteRow';
import { AspiranteAside } from './AspiranteAside';

const MOCK_ASPIRANTES = [
    {
        id: 1,
        nombre: "Juan Carlos",
        apellidoPaterno: "García",
        apellidoMaterno: "Pérez",
        correo: "juan.garcia@gmail.com",
        telefono: "33 1234 5678",
        licenciatura: "Ingeniería en Computación",
        posgradoInteres: "Maestría en IA",
        motivos: "Me interesa profundizar mis conocimientos en redes neuronales y su aplicación en la industria médica para mejorar diagnósticos tempranos.",
        status: "carga ligera"
    },
    {
        id: 2,
        nombre: "Vivi",
        apellidoPaterno: "Navarro",
        apellidoMaterno: "Estrada",
        correo: "vivi.nav@hotmail.com",
        telefono: "33 9876 5432",
        licenciatura: "Licenciatura en Informática",
        posgradoInteres: "Doctorado en Ciencias",
        motivos: "Deseo realizar investigación de vanguardia en algoritmos de optimización para ciudades inteligentes.",
        status: "carga de documentacion"
    },
    {
        id: 3,
        nombre: "Diego Josuan",
        apellidoPaterno: "López",
        apellidoMaterno: "Torres",
        correo: "diego.jos@outlook.com",
        telefono: "33 5544 3322",
        licenciatura: "Ingeniería en Sistemas",
        posgradoInteres: "Maestría en Ciberseguridad",
        motivos: "La seguridad informática es vital hoy en día; mi objetivo es desarrollar nuevas metodologías de defensa contra ataques zero-day.",
        status: "carga ligera"
    }
];

export const AspirantesTable = ({ search = "", estado = "all" }) => {
    const [selectedAspirante, setSelectedAspirante] = useState(null);

    const filteredAspirantes = MOCK_ASPIRANTES.filter((aspirante) => {
        const nombreCompleto = `${aspirante.nombre} ${aspirante.apellidoPaterno} ${aspirante.apellidoMaterno}`.toLowerCase();
        const matchesSearch = nombreCompleto.includes(search.toLowerCase());
        const matchesEstado = estado === "all" || aspirante.status === estado;
        
        return matchesSearch && matchesEstado;
    });

    const headers = [
        { label: "", sortable: false },
        { label: "Nombre Completo" }
    ];

    return (
        <div className="flex h-full overflow-hidden w-full">
            <section className="flex-1 flex flex-col overflow-hidden">
                <CoordTable headers={headers}>
                    {filteredAspirantes.map((aspirante) => (
                        <AspiranteRow 
                            key={aspirante.id} 
                            aspirante={aspirante}
                            onClick={() => setSelectedAspirante(aspirante)}
                            isSelected={selectedAspirante?.id === aspirante.id}
                        />
                    ))}
                </CoordTable>
            </section>

            {/* Panel lateral del Aspirante */}
            {selectedAspirante && (
                <AspiranteAside 
                    aspirante={selectedAspirante} 
                    onClose={() => setSelectedAspirante(null)} 
                />
            )}
        </div>
    );
};
