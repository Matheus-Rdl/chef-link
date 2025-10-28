import styles from "./navbar.module.css";
import { getCurrentDate } from "../../../utils/dateFunctions.js";

export default function NavBar() {
  const authData = JSON.parse(localStorage.getItem("auth"));
  console.log(authData ? "true" : "false");
  console.log(authData);
  const formattedDate = getCurrentDate();

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <nav className={styles.navbarContainer}>
        <div className={styles.navbarItems}>
          <p>{formattedDate}</p>
          {authData && <p>{authData.user.username}</p>}
        </div>
        <div className={styles.navBarInformation}>
          <img className={styles.logo} src="/logo.png" alt="" />
        </div>
      </nav>
    </>
  );
}
