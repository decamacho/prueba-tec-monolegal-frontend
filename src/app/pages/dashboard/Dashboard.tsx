import { LineChartOutlined, ClockCircleOutlined, ExclamationCircleOutlined, TeamOutlined } from '@ant-design/icons';
import styles from './Dashboard.module.css';
import { Card } from '../../components/iu/card/Card';
import { ModuleHeader } from '../../components/iu/module-header/ModuleHeader';
import { TableResume } from '../../components/iu/data-table/table-resume/TableResume';

export const Dashboard = () => {
  const today = new Intl.DateTimeFormat('es-CO', { 
    day: 'numeric', month: 'long', year: 'numeric' 
  }).format(new Date());

  return (
    <div className={styles.dashboard}>
      <ModuleHeader title="Resumen general" subtitle={today} />

      <div className={styles.dashboard__statsGrid}>
        <Card 
          title="Ingresos cobrados" value="$8.250.000" 
          icon={<LineChartOutlined />} 
          iconVariant="primary"
        />
        <Card 
          title="Facturas pendientes" value="2" 
          icon={<ClockCircleOutlined />} 
          iconVariant="warning"
        />
        <Card 
          title="Facturas vencidas" value="2" 
          icon={<ExclamationCircleOutlined />} 
          iconVariant="danger"
        />
        <Card
          title="Clientes activos" value="6" 
          icon={<TeamOutlined />} 
          iconVariant="success"
        />
      </div>

      <div className={styles.dashboard__contentGrid}>
        <TableResume />
      </div>
    </div>
  );
};