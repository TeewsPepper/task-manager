import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
      <p className={styles.text}>Cargando...</p>
    </div>
  );
}