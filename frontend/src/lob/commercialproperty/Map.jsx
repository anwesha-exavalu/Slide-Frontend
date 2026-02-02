import React from 'react';
import styles from './LocationComponent.module.css';

export function MapView() {
  return (
    <section className={styles.mapContainer}  style={{ marginLeft: '30px' }}>
      <iframe
        title="Google Map"
        width="410px"
        height="300px"
        className={styles.mapImage}
        
        src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12090.324836224074!2d-74.0060!3d40.7128!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316b24938b%3A0x3f9e5180f4a3e6a!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1634485201153`}
        allowFullScreen
      ></iframe>
    </section>
  );
}

export default MapView;
