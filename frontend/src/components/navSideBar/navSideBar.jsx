import styles from './navSideBar.module.css'
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { TiHomeOutline } from "react-icons/ti";

export default function NavSideBar() {

  return (
    <div className={styles.navSideBar}>
          <Link to={"/"} className={styles.navbarLink}>
            <TiHomeOutline/>
          </Link>
          <Link to={"/tables"} className={styles.navbarLink}>
            <MdOutlineTableRestaurant/>
          </Link>
          <Link to={"/plates"} className={styles.navbarLink}>
            <BiFoodMenu/>
          </Link>
          <Link to={"/profile"} className={styles.navbarLink}>
            <FaRegUserCircle/>
          </Link>
      
    </div>
  );
}
