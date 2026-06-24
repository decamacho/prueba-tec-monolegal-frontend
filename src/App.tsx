import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './app/components/layout/MainLayout';
import { Dashboard } from './app/pages/dashboard/Dashboard';
import { Invoice } from './app/pages/invoice/Invoice';
import { Client } from './app/pages/client/Client';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          
          <Route index element={<Dashboard />} />
          <Route path="client" element={<Client />} />
          <Route path="invoice" element={<Invoice />} />
          
          {/* Ruta 404 si la ruta no se encuentra */}
          <Route path="*" element={
            <div className="flex justify-center items-center h-full">
              <h1 className="text-2xl font-bold text-gray-400">404 - Página no encontrada</h1>
            </div>
          } />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;