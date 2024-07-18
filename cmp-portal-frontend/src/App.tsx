import { useAuth } from 'react-oidc-context'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import './App.css'
import Bar from './components/Bar'
import { instance } from './config/axios'
import Home from './pages/Home'
import { User } from 'oidc-client-ts'

const Temp = () => {
  const auth = useAuth()
  return (
    <div>
      <button onClick={() => auth.signoutRedirect()}>sign out</button>
      <button
        onClick={async () => {
          await instance.get('/doggo')
        }}
      >
        test
      </button>
    </div>
  )
}

const isAuthenticate = () => {
  const oidcStorage = sessionStorage.getItem(
    'oidc.user:http://localhost:8080/realms/myrealm:myclient',
  )

  if (oidcStorage === null) {
    return false
  }

  if (!User.fromStorageString(oidcStorage).access_token) {
    return false
  }

  return true
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: () => {
      if (isAuthenticate()) {
        return redirect('/temp')
      } else {
        return null
      }
    },
  },
  {
    path: '/*',
    loader: () => {
      if (isAuthenticate()) {
        return null
      } else {
        return redirect('/')
      }
    },
    errorElement: <div> 4040 </div>,
    children: [
      {
        path: 'temp',
        element: <Temp />,
      },
      {
        path: 'home',
        element: <Bar />,
      },
      {
        path: '*',
        element: <div>4040</div>,
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
