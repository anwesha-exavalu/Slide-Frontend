import React from 'react';
import styles from './Header.module.css';
import DropdownMenu from './ActionMenu'; // Import the DropdownMenu component

export function HeaderDesign() {
  return (
    <header className={styles.header}>
      <img src="Exavalu_logo.png" alt="Exavalu_logo.png" className={styles.complogo} height="100%" />

      

      {/* Search bar section */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search..." // Placeholder text for search bar
        />
      </div>

      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9cd1f5f56695d5cfe6e6d8593defc492457b35b1ae45c2c865384c9a0e006406?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa" alt="Company logo" className={styles.logo} />

      <div className={styles.userInfo}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c6ccf97ba0270962e77c546c4769ceb9568acdf197d37473c8380510eab3531?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa" alt="User avatar" className={styles.userAvatar} />
        <div className={styles.userDetails}>
          <p className={styles.userName}>Haydenson</p>
          <p className={styles.userRole}>Admin</p>
        </div>
        <button className={styles.iconButton} aria-label="Notifications">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b491779c07895ba5a60b0e6d9591ac441cee985663c5c161add5ce080bf4ae3?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa" alt="" />
        </button>
        <button className={styles.iconButton} aria-label="Settings">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a194d0f5da2012e8a9d8497014ba1301a694a942ffc25d047352b15222c8597e?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa" alt="" />
        </button>
      </div>

      {/* Add DropdownMenu here */}
      <DropdownMenu />
    </header>
  );
}

export default HeaderDesign;
