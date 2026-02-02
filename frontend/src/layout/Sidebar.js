import React, { useState } from "react";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // const handleNavigation = (event, path, isSubmission) => {
  //   event.preventDefault(); // Prevent default anchor behavior
  //   onNavigate(isSubmission); // Pass whether this is for Submission
  //   window.location.href = path; // Redirect to the specified path
  // };

  const navItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/815f9908f238e71f9f3e2c88a0a21059eea63ef90b8a2aee1c8a80c6a0bade94?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa",
      text: "Submission",
      path: "/submission",
      isSubmission: true,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/815f9908f238e71f9f3e2c88a0a21059eea63ef90b8a2aee1c8a80c6a0bade94?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa",
      text: "Dashboard",
      path: "/dashboard",
      isSubmission: false,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/17a2a3cf08bba2f3bbe789ad554ed81b555f8c4481855f3fa25b6f6308aa7f20?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa",
      text: "Account Info",
      path: "/account",
      isSubmission: false,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/10d25dbe5596ccc03a6eb2d352de511cc3937555dac6aff1abf445d1b647f1ec?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa",
      text: "Audit Trail",
      path: "/AuditTrail",
      isSubmission: false,
    },
  ];

  return (
    <div>
      <button className={styles.hamburgerButton} onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar Container */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <h1 className={styles.teamName}>Underwriting</h1>
          <div className={styles.teamHandle}>WORKBENCH</div>
          <button className={styles.closeButton} onClick={toggleSidebar}>
            ✕
          </button>
        </div>
        <div className={styles.accountDetails}>
          <span className={styles.accountLabel}>ACCOUNT DETAILS</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a590dd80df0a36100ee695ff665a938a4cd071fbddfb09d00187a72e159e12ae?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa"
            alt="Account avatar"
            className={styles.accountAvatar}
          />
          <h2 className={styles.accountName}>Wilson Properties</h2>
          <address className={styles.accountAddress}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/400be7cb3efa8c57f2495018b33cfff53bce52364b7b7798751d7c5f5c7d1dac?placeholderIfAbsent=true&apiKey=d51d7313bdca4fcf802b81d20b6296aa"
              alt="Location icon"
              className={styles.addressIcon}
            />
            123 Parkway
          </address>
        </div>
        <nav>
          <ul className={styles.navList}>
            {navItems.map((item, index) => (
              <li key={index} className={styles.navItem}>
                <a
                  href={item.path}
                  className={styles.navLink}
                  // onClick={(e) => handleNavigation(e, item.path, item.isSubmission)}
                >
                  <img
                    src={item.icon}
                    alt={item.text}
                    className={styles.navIcon}
                  />
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay when sidebar is open */}
      {isOpen && <div className={styles.overlay} onClick={toggleSidebar}></div>}
    </div>
  );
}

export default Sidebar;
