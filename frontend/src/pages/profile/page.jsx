import styles from "./page.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../services/useAuth";
import { Button } from "@mui/material";
import NavSideBar from "../../components/navSideBar/navSideBar";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

export default function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    if (!authData) {
      navigate("/auth");
    }
  }, [authData]);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  //Função para voltar a tela
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="pageContainer">
      <FaRegArrowAltCircleLeft
        className={styles.arrowBack}
        onClick={handleBack}
      />
      <NavSideBar />
      <div className={styles.profilePageContainer}>
        <div>
          <h1>Profile</h1>
          <h3>{authData?.user?.username}</h3>
          <h3>{authData?.user?.fullname}</h3>
          <Button onClick={handleLogout}>LogOut</Button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
