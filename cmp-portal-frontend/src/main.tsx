import ReactDOM from 'react-dom/client'
import './index.css'
import { AuthProvider } from 'react-oidc-context'
import React from 'react'
import App from './App.tsx'

const oidcConfig = {
  authority: 'http://localhost:8080/realms/myrealm',
  client_id: 'myclient2',
  redirect_uri: 'http://localhost:5174',
  post_logout_redirect_uri: 'http://localhost:5174',
  onSigninCallback: (): void => {
    window.history.replaceState({}, document.title, window.location.pathname)
  },
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
