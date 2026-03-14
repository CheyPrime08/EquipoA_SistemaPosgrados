import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Coordinación/SideBar'
import Tesis from './pages/Coordinación/Tesis'
import './App.css'

function App() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="flex-1 bg-white">
        <Routes>
          <Route path="/" element={<Navigate to="/coordinacion/tesis" replace />} />
          <Route path="/coordinacion/tesis" element={<Tesis />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
