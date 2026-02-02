import React from 'react';
import styles from './LocationComponent.module.css';

export function LocationHeader() {
  return (
    <header className={styles.locationHeader}>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e93522a8347016172ca5fe980b9aba72f3e7e4c7c4eb407ef109214c78f3ea0?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa" alt="Location icon" className={styles.locationIcon} />
      <h1 className={styles.locationTitle}>Address</h1>
    </header>
  );
}

export default LocationHeader;