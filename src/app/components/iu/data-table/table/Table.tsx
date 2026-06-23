import styles from './Table.module.css';

export interface Column<T> {
  key: string;
  title: string;
  render: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
}

export const Table = <T,>({ data, columns, isLoading }: TableProps<T>) => {
  if (isLoading) {
    return <div className={styles.table__infoLoad}>Cargando datos...</div>;
  }

  if (!data || data.length === 0) {
    return <div className={styles.table__infoLoad}>No hay datos para mostrar.</div>;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.table__thead}>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={styles.table__th}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.table__tbody}>
          {data.map((item, index) => (
            <tr key={index} className={styles.table__tr}>
              {columns.map((col) => (
                <td key={col.key} className={styles.table__td}>
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};