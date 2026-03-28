const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'frontend/src');

const mappings = [
  // Moved components (Specific to General)
  { from: /@\/components\/layout\/LayoutCoordinacion/g, to: '@/modules/coordinador/layout/LayoutCoordinacion' },
  { from: /@\/components\/layout\/CoordSidebar/g, to: '@/modules/coordinador/layout/CoordSidebar' },
  { from: /@\/components\/layout\/CoordHeader/g, to: '@/modules/coordinador/layout/CoordHeader' },
  { from: /@\/components\/layout\/TituloRuta/g, to: '@/modules/coordinador/layout/TituloRuta' },

  { from: /@\/components\/common\/CoordPanel/g, to: '@/modules/coordinador/components/CoordPanel' },
  { from: /@\/components\/common\/CardCiclo/g, to: '@/modules/coordinador/components/CardCiclo' },
  { from: /@\/components\/common\/CardConvocatoria/g, to: '@/modules/coordinador/components/CardConvocatoria' },
  { from: /@\/components\/common\/CardButton/g, to: '@/modules/coordinador/components/CardButton' },
  { from: /@\/components\/common\/CardDescription/g, to: '@/modules/coordinador/components/CardDescription' },
  { from: /@\/components\/common\/CardTitle/g, to: '@/modules/coordinador/components/CardTitle' },

  { from: /@\/components\/layout\/AppSidebar/g, to: '@/modules/coordinador/shared/AppSidebar' },
  { from: /@\/components\/layout\/AppHeader/g, to: '@/modules/coordinador/shared/AppHeader' },
  { from: /@\/components\/layout\/BotonUsuario/g, to: '@/modules/coordinador/shared/BotonUsuario' },
  { from: /@\/components\/layout\/HeaderButton/g, to: '@/modules/coordinador/shared/HeaderButton' },
  { from: /@\/components\/layout\/LayoutDashboard/g, to: '@/modules/coordinador/shared/LayoutDashboard' },
  { from: /@\/components\/common\/AppPanel/g, to: '@/modules/coordinador/shared/AppPanel' },
  { from: /@\/components\/common\/AppTooltip/g, to: '@/modules/coordinador/shared/AppTooltip' },
  { from: /@\/components\/common\/PanelHeader/g, to: '@/modules/coordinador/shared/PanelHeader' },

  // Role renames (Coordinacion -> Coordinador)
  { from: /@\/pages\/coordinacion/g, to: '@/pages/coordinador' },
  { from: /@\/modules\/coordinacion/g, to: '@/modules/coordinador' },
  { from: /@\/assets\/coordinacion/g, to: '@/assets/coordinador' },
  { from: /@\/constants\/coordinacion/g, to: '@/constants/coordinador' },
  { from: /@\/styles\/coordinacion/g, to: '@/styles/coordinador' },
  { from: /"\.\/styles\/coordinacion/g, to: '"./styles/coordinador' }, // For main.jsx

  // Role renames (Alumnos -> Alumno)
  { from: /@\/pages\/alumnos/g, to: '@/pages/alumno' },
  { from: /@\/modules\/alumnos/g, to: '@/modules/alumno' },
  { from: /@\/assets\/alumnos/g, to: '@/assets/alumno' },
  { from: /@\/constants\/alumnos/g, to: '@/constants/alumno' },
  { from: /@\/pages\/alumnado/g, to: '@/pages/alumno' },
  { from: /@\/modules\/alumnado/g, to: '@/modules/alumno' },
  { from: /@\/assets\/alumnado/g, to: '@/assets/alumno' },
  { from: /@\/constants\/alumnado/g, to: '@/constants/alumno' },

  // Role renames (Prerregistro -> Aspirante)
  { from: /@\/pages\/prerregistro/g, to: '@/pages/aspirante' },
  { from: /@\/modules\/prerregistro/g, to: '@/modules/aspirante' },
  { from: /@\/assets\/prerregistro/g, to: '@/assets/aspirante' },
  { from: /@\/constants\/prerregistro/g, to: '@/constants/aspirante' },
  { from: /@\/pages\/preregistro/g, to: '@/pages/aspirante' },
  { from: /@\/modules\/preregistro/g, to: '@/modules/aspirante' },
  { from: /@\/assets\/preregistro/g, to: '@/assets/aspirante' },
  { from: /@\/constants\/preregistro/g, to: '@/constants/aspirante' },
  
  // Specific catch-all for any other occurrences
  { from: /\/coordinacion\//g, to: '/coordinador/' },
  { from: /\/alumnos\//g, to: '/alumno/' },
  { from: /\/alumnado\//g, to: '/alumno/' },
  { from: /\/prerregistro\//g, to: '/aspirante/' },
  { from: /\/preregistro\//g, to: '/aspirante/' }
];

function walk(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (['.jsx', '.js', '.css'].includes(path.extname(file))) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      mappings.forEach(m => {
        content = content.replace(m.from, m.to);
      });

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
      }
    }
  });
}

walk(srcDir);
