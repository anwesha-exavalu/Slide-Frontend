import React from 'react';
import styles from './LocationComponent.module.css';

function TabNavigation() {
  return (
    <nav className={styles.tabNavigation}>
      <button className={`${styles.tabButton} ${styles.activeTab}`}>Location Details</button>
      <button className={styles.tabButton}>Coverages</button>
      <button className={styles.tabButton}>Additional Interest</button>
    </nav>
  );
}

export default TabNavigation;