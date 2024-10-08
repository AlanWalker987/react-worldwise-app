import { Outlet } from "react-router-dom";
import Appnav from "./Appnav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <Appnav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()}
          by Worldwise Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
