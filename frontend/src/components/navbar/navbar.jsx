import styles from "./navbar.module.css";
import { LuMenu } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { TiHomeOutline } from "react-icons/ti";
import { Drawer } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <nav className={styles.navbarContainer}>
        <div className={styles.navBarInformation}>
          <img className={styles.logo} src="/logo.png" alt="" />
        </div>
        <div className={styles.navbarItems}>
          <LuMenu className={styles.navbarIcons} onClick={handleOpenMenu} />
        </div>
      </nav>

      <Drawer anchor="right" open={openMenu} onClose={handleOpenMenu}>
        <IoMdCloseCircle
          className={styles.drawerBtnClose}
          onClick={handleOpenMenu}
        />
        <div className={styles.drawer}>
          <Link onClick={handleOpenMenu} to={"/"} className={styles.navbarLink}>
            <TiHomeOutline/>
            Home
          </Link>
          <Link onClick={handleOpenMenu} to={"/tables"} className={styles.navbarLink}>
            <MdOutlineTableRestaurant/>
            Tables
          </Link>
          <Link onClick={handleOpenMenu} to={"/plates"} className={styles.navbarLink}>
            <BiFoodMenu/>
            Plates
          </Link>
          <Link onClick={handleOpenMenu} to={"/profile"} className={styles.navbarLink}>
            <FaRegUserCircle/>
            Profile
          </Link>
        </div>
      </Drawer>
    </>
  );
}
