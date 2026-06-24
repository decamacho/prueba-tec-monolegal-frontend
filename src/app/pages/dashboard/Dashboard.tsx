import { ClockCircleOutlined, ExclamationCircleOutlined, TeamOutlined } from '@ant-design/icons';
import styles from './Dashboard.module.css';
import { Card } from '../../components/iu/card/Card';
import { ModuleHeader } from '../../components/iu/module-header/ModuleHeader';
import { TableResume } from '../../components/iu/data-table/table-resume/TableResume';
import { useDashboardLogic } from '../../hooks/dashboard/useDashboardLogic';
import { LoadMessage } from '../../components/iu/load-message/LoadMessage';

export const Dashboard = () => {
  const { metrics, isLoading, today, latestInvoices } = useDashboardLogic();

  if (isLoading) {
    return <LoadMessage message={'Cargando métricas del negocio...'}/>;
  }

  return (
    <div className={styles.dashboard}>
      <ModuleHeader title="Resumen general" subtitle={today} />

      <div className={styles.dashboard__statsGrid}>
        <Card
          title="Facturas 1er recordatorio" value={metrics.firstReminderInvoices}
          icon={<ClockCircleOutlined />}
          iconVariant="primary"
        />
        <Card
          title="Facturas 2do recordatorio" value={metrics.secondReminderInvoices}
          icon={<ClockCircleOutlined />}
          iconVariant="warning"
        />
        <Card
          title="Desactivado" value={metrics.inactiveInvoices}
          icon={<ExclamationCircleOutlined />}
          iconVariant="danger"
        />
        <Card
          title="Clientes" value={metrics.activeClients}
          icon={<TeamOutlined />}
          iconVariant="success"
        />
      </div>

      <div className={styles.dashboard__contentGrid}>
        <TableResume 
          latestInvoices={latestInvoices as never[]}
        />
      </div>
    </div>
  );
};