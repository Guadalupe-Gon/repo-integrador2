import { Route, Routes } from 'react-router'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Contacto from './pages/Contacto/Contacto'
import Registro from './pages/Registro/Registro'
import Nosotros from './pages/Nosotros/Nosotros'
import AdminProd from './pages/AdminProd/AdminProd'
import DetalleProd from './pages/DetalleProd/DetalleProd'
import AdminUser from './pages/AdminUser/AdminUser'
import OrderSidebar from './components/OrderSidebar/OrderSidebar'


function App() {

  return (
    <>

        <main className="main-container">

          <Header />

          <OrderSidebar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Contacto" element={<Contacto />} />
            <Route path="/Registro" element={<Registro />} />
            <Route path="/Nosotros" element={<Nosotros />} />
            <Route path="/AdminProd" element={<AdminProd />} />
            <Route path="/AdminUser" element={<AdminUser />} />
            <Route path="/DetalleProd/:id" element={<DetalleProd />} />
          </Routes>

          <Footer />

        </main>

    </>
  )
}

export default App