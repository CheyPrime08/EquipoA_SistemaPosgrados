import { Calendar, UserPlus, GraduationCap, ClipboardCheck, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; 
import leon_logo from "../../assets/icons/Leon_logo.png"; 

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const menuItems = [
    { name: 'Agenda', icon: <Calendar size={22} />, path: '/coordinacion/agenda' },
    { name: 'Pre-registro', icon: <UserPlus size={22} />, path: '/coordinacion/prerregistro' },
    { name: 'Tesis', icon: <GraduationCap size={22} />, path: '/coordinacion/tesis' },
    { name: 'Revisión', icon: <ClipboardCheck size={22} />, path: '/coordinacion/revision' },
  ];

  return (
    <aside className="w-72 h-screen bg-[#EFE9E3] flex flex-col justify-between p-8 border-r border-[#D9CFC7] shadow-sm">
      
      {/* SECCIÓN SUPERIOR: Logo y Navegación */}
      <div className="flex flex-col items-start w-full">
        
        {/* Logo: Pegado a la esquina superior izquierda */}
        <div className="mb-12">
          <img 
            src={leon_logo} 
            alt="Logo León" 
            className="w-20 h-20 object-contain hover:scale-105 transition-transform" 
          />
        </div>

        {/* Menú de Navegación */}
        <nav className="flex flex-col gap-y-4 w-full">
          {menuItems.map((item) => {
            
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                
                className={`
                  flex items-center gap-4 p-4 w-full rounded-2xl transition-all duration-200
                  border-none outline-none shadow-none
                  ${isActive 
                    ? "bg-[#D9CFC7] text-[#4A4A4A] font-bold shadow-sm" 
                    : "bg-transparent text-[#C9B59C] hover:bg-[#F9F8F6] hover:text-[#4A4A4A]" 
                  }
                `}
                style={{ backgroundColor: isActive ? '#D9CFC7' : 'transparent' }} 
              >
                <span className={isActive ? "text-[#4A4A4A]" : "text-[#C9B59C]"}>
                  {item.icon}
                </span>
                <span className="text-base tracking-wide uppercase font-medium">
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* SECCIÓN INFERIOR: Botón de Salida */}
      <div className="w-full pt-6 border-t border-[#D9CFC7]">
        <button 
          onClick={() => console.log("Cerrando sesión...")}
          className="flex items-center gap-4 p-4 w-full bg-transparent text-[#C9B59C] hover:text-red-600 transition-colors duration-300 rounded-2xl"
        >
          <LogOut size={22} />
          <span className="text-base font-bold uppercase">Log Out</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;