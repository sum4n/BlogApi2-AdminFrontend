import styles from "./NavigationBar.module.css";
import { Link } from "react-router-dom";

const NavigationBar = ({ user, handleLogout }) => {
  return (
    <div className={styles.flexnav}>
      <h1>
        <p>My Blog</p>
      </h1>
      {user && (
        <div className={styles.flexauth}>
          <p>{user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {!user && (
        <div className={styles.flexauth}>
          <Link to="/user/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
