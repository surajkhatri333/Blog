
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import { LoginProvider } from './Context/LoginContext.jsx';


createRoot(document.getElementById('root')).render(
   <>
      <LoginProvider>
         <App />
         <ToastContainer position='top-right' />
      </LoginProvider>
   </>

)
