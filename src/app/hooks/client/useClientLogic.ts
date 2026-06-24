// src/app/pages/hooks/useClientLogic.ts
import { useMemo } from 'react';
import type { ClientCardProps } from '../../components/iu/card/client-card/ClientCard';
import { useClients } from './useClients';

export interface BackendClient {
  nombre: string;
  documento: string;
  emailContacto: string;
  telefono: string;
  direccion: string;
  sumaFacturas: number;
  numeroFacturas: number;
}

export const useClientLogic = () => {
  const { data: clientsData = [], isLoading, isError } = useClients();

  const transformedClients: ClientCardProps[] = useMemo(() => {
    return clientsData.map((client) => {
      const backendClient = client as BackendClient;
      return {
        id: backendClient.documento,
        nombre: backendClient.nombre,
        documento: backendClient.documento,
        contactoDireccion: backendClient.direccion,
        contactoEmail: backendClient.emailContacto,
        contactoTelefono: backendClient.telefono,
        numeroFacturas: backendClient.numeroFacturas,
        sumaFacturas: backendClient.sumaFacturas
      };
    });
  }, [clientsData]);

  return {
    clients: transformedClients,
    isLoading,
    isError,
  };
};