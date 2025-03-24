import styles from './loader.module.css'
export const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <span className={styles.loader}></span>
    </div>
  );
};
