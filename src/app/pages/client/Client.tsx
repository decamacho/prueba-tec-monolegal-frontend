// src/app/pages/Client.tsx
import { ClientCard } from '../../components/iu/card/client-card/ClientCard';
import { LoadMessage } from '../../components/iu/load-message/LoadMessage';
import { ModuleHeader } from '../../components/iu/module-header/ModuleHeader';
import { useClientLogic } from '../../hooks/client/useClientLogic';
import styles from './Client.module.css';

export const Client = () => {
  const { clients, isLoading, isError } = useClientLogic();

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Error al cargar el portafolio de clientes. Por favor, verifica tu conexión.
      </div>
    );
  }

  return (
    <div className={styles.clientes}>
      <ModuleHeader
        title="Clientes" 
        subtitle={`${clients.length} clientes registrados`}
      />

      {isLoading ? (
        <LoadMessage message={'Cargando clientes...'}/>
      ) : (
        <div className={styles.clientes__grid}>
          {clients.map((client) => (
            <ClientCard
              key={client.id} 
              {...client}
            />
          ))}
        </div>
      )}
    </div>
  );
};