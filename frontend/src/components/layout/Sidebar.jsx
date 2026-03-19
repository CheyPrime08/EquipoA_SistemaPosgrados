import React from 'react';
import { 
  Home, 
  Users, 
  BookOpen, 
  Settings, 
  LogOut,
  Calendar,
  ContactRound
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import leonLogo from '@/components/ui/leon-logo.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <Home size={20}/>, label: "Inicio", path: "/" },
    { icon: <Users size={20}/>, label: "Coordinación", path: "/coordinacion" },
    { icon: <BookOpen size={20}/>, label: "Documentos", path: "/documentos" },
    { icon: <ContactRound size={20}/>, label: "Revisión Alumnos", path: "/rev-alumnos" },
    { icon: <Calendar size={20}/>, label: "Pre-Registro", path: "/prerregistro" },
    { icon: <Settings size={20}/>, label: "Configuración", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-transparent p-6 flex flex-col gap-4 shrink-0 border-r border-gray-200/50 min-h-screen">
      <div className="mb-8 px-2 flex items-center gap-3 relative cursor-pointer" onClick={() => navigate('/')}>
        <img src={leonLogo} alt="Logo" className="w-12 h-12 object-contain" />
        <span className="font-bold text-stone-800 tracking-tight leading-tight">Sistema de<br/>Posgrados</span>
      </div>
      
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <div 
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-200 ${
              location.pathname === item.path 
                ? 'bg-[#D6C7B3] text-gray-900 shadow-sm font-semibold' 
                : 'text-gray-500 hover:bg-white hover:shadow-sm'
            }`}
          >
            <span className={location.pathname === item.path ? "text-gray-900" : "text-gray-400"}>
              {item.icon}
            </span>
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="mt-auto border-t border-gray-200 pt-4">
        <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer text-gray-500 hover:bg-white hover:shadow-sm transition-all duration-200">
          <LogOut size={20} className="text-gray-400" />
          <span className="text-sm">Cerrar Sesión</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
