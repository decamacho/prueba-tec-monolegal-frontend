import styles from './LoadMessage.module.css';

export const LoadMessage = ({ message }: { message: string }) => {
  return (
    <div className={styles.load__message}>
      {message}
    </div>
  );
};