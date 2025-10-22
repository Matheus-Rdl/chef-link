import styles from "./navSideBar.module.css";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { BiFoodMenu } from "react-icons/bi";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { TiHomeOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import { Drawer } from "@mui/material";

export default function NavSideBar() {
  const [width, setWidth] = useState(window.innerWidth);
  const [menuSideBar, setMenuSideBar] = useState(false);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // limpar o event listener quando o componente desmontar
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuSideBar = () => {
    setMenuSideBar(!menuSideBar);
  };

  return (
    <>
      {width >= 520 ? (
        <div className={styles.navSideBar}>
          <Link to={"/"} className={styles.navbarLink}>
            <TiHomeOutline />
          </Link>
          <Link to={"/tables"} className={styles.navbarLink}>
            <MdOutlineTableRestaurant />
          </Link>
          <Link to={"/plates"} className={styles.navbarLink}>
            <BiFoodMenu />
          </Link>
          <Link to={"/profile"} className={styles.navbarLink}>
            <FaRegUserCircle />
          </Link>
        </div>
      ) : (
        <>
          <LuMenu className={styles.navbarMenuSideBar} onClick={handleMenuSideBar} />
          <Drawer anchor="left" open={menuSideBar} onClose={handleMenuSideBar}>
            <div className={styles.navSideBar}>
              <Link onClick={handleMenuSideBar} to={"/"} className={styles.navbarLink}>
                <TiHomeOutline />
              </Link>
              <Link onClick={handleMenuSideBar} to={"/tables"} className={styles.navbarLink}>
                <MdOutlineTableRestaurant />
              </Link>
              <Link onClick={handleMenuSideBar} to={"/plates"} className={styles.navbarLink}>
                <BiFoodMenu />
              </Link>
              <Link onClick={handleMenuSideBar} to={"/profile"} className={styles.navbarLink}>
                <FaRegUserCircle />
              </Link>
            </div>
          </Drawer>
        </>
      )}
    </>
  );
}
