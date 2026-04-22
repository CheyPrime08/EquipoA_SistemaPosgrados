import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Eye, Trash2 } from 'lucide-react';

/**
 * Componente reutilizable de acciones por fila.
 * Muestra un ícono de lápiz que, al hacer clic, despliega 3 íconos de acción:
 *   - 👁 Ver   (onView)
 *   - ✏️ Editar (onEdit)
 *   - 🗑 Eliminar (onDelete)
 *
 * Props:
 *   onView   — callback al hacer clic en "Ver"
 *   onEdit   — callback al hacer clic en "Editar"
 *   onDelete — callback al hacer clic en "Eliminar"
 *   showView, showEdit, showDelete — booleanos para mostrar/ocultar cada acción (default true)
 */
export function CoordRowActions({
    onView,
    onEdit,
    onDelete,
    showView = true,
    showEdit = true,
    showDelete = true,
}) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);

    // Cerrar al hacer clic fuera
    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    const actionBtn =
        "p-1.5 rounded-lg transition-colors duration-150";

    return (
        <div ref={containerRef} className="relative inline-flex items-center">
            {/* Estado cerrado: solo el lápiz */}
            {!open && (
                <button
                    title="Acciones"
                    onClick={(e) => { e.stopPropagation(); setOpen(true); }}
                    className="text-stone-400 hover:text-stone-800 transition-colors"
                >
                    <Pencil size={16} />
                </button>
            )}

            {/* Estado abierto: íconos de acción desplegados */}
            {open && (
                <div className="flex items-center gap-1 animate-in fade-in slide-in-from-right-2 duration-200">
                    {showView && (
                        <button
                            title="Ver"
                            onClick={(e) => { e.stopPropagation(); onView?.(); setOpen(false); }}
                            className={`${actionBtn} text-stone-400 hover:text-[#C9B29B] hover:bg-[#FAF8F5]`}
                        >
                            <Eye size={16} />
                        </button>
                    )}
                    {showEdit && (
                        <button
                            title="Editar"
                            onClick={(e) => { e.stopPropagation(); onEdit?.(); setOpen(false); }}
                            className={`${actionBtn} text-stone-400 hover:text-stone-800 hover:bg-[#FAF8F5]`}
                        >
                            <Pencil size={16} />
                        </button>
                    )}
                    {showDelete && (
                        <button
                            title="Eliminar"
                            onClick={(e) => { e.stopPropagation(); onDelete?.(); setOpen(false); }}
                            className={`${actionBtn} text-stone-400 hover:text-red-500 hover:bg-red-50`}
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
