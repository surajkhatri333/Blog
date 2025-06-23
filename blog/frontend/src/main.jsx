
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')).render(

   <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
         redirect_uri: window.location.origin
      }}>
      <App />
      <ToastContainer position='top-right' />
   </Auth0Provider>

)
