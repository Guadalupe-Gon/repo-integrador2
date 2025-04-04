import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import OrderProvider from './Context/OrderContext.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <OrderProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </OrderProvider>
  </BrowserRouter>

);