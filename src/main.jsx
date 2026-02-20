import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Inventory from './pages/Inventory.jsx'
import Sales from './pages/Sales.jsx'
import Expenses from './pages/Expenses.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,   // Layout
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'sales', element: <Sales /> },
      { path: 'expenses', element: <Expenses /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)