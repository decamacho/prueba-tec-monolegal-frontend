import { ClientCard, type ClientCardProps } from '../../components/iu/card/client-card/ClientCard';
import { ModuleHeader } from '../../components/iu/module-header/ModuleHeader';
import styles from './Client.module.css';

const mockClientes: ClientCardProps[] = [
  {
    id: '1', nombre: 'Distribuidora El Norte S.A.', documento: '76.234.567-8',
    contactoNombre: 'Felipe Araya', contactoEmail: 'faraya@elnorte.cl', contactoTelefono: '+56 9 8123 4567',
    totalFacturas: 12, totalCompras: '28.4M'
  },
  {
    id: '2', nombre: 'Comercial Andina Ltda.', documento: '78.901.234-5',
    contactoNombre: 'Valentina Cruz', contactoEmail: 'vcruz@andina.cl', contactoTelefono: '+56 9 7654 3210',
    totalFacturas: 5, totalCompras: '9.3M'
  },
  {
    id: '3', nombre: 'Inversiones Patagonia', documento: '77.654.321-0',
    contactoNombre: 'Rodrigo Muñoz', contactoEmail: 'rmunoz@patagonia.cl', contactoTelefono: '+56 9 9871 2345',
    totalFacturas: 8, totalCompras: '45.1M'
  },
  {
    id: '4', nombre: 'Tech Solutions SpA', documento: '76.543.210-K',
    contactoNombre: 'Catalina Vega', contactoEmail: 'cvega@techsol.cl', contactoTelefono: '+56 9 6543 2109',
    totalFacturas: 3, totalCompras: '5.2M'
  },
  {
    id: '5', nombre: 'Grupo Construye S.A.', documento: '79.012.345-6',
    contactoNombre: 'Mauricio Lagos', contactoEmail: 'mlagos@construye.cl', contactoTelefono: '+56 9 5432 1098',
    totalFacturas: 21, totalCompras: '87.6M'
  },
  {
    id: '6', nombre: 'Alimentos del Sur Ltda.', documento: '76.789.012-3',
    contactoNombre: 'Sofía Mena', contactoEmail: 'smena@alsur.cl', contactoTelefono: '+56 9 4321 0987',
    totalFacturas: 7, totalCompras: '12.8M'
  }
];

export const Client = () => {
  const handleNuevoCliente = () => {
    console.log("Abrir modal o redireccionar para crear nuevo cliente");
  };

  const handleVerDetalle = (id: string) => {
    console.log("Navegando al detalle del cliente con ID:", id);
  };

  return (
    <div className={styles.clientes}>
      <ModuleHeader
        title="Clientes" 
        subtitle={`${mockClientes.length} clientes registrados`}
        onNewClick={handleNuevoCliente}
      />

      <div className={styles.clientes__grid}>
        {mockClientes.map((cliente) => (
          <ClientCard
            key={cliente.id} 
            {...cliente} 
            onVerDetalle={handleVerDetalle} 
          />
        ))}
      </div>
    </div>
  );
};