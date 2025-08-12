import styles from "./page.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../services/useAuth";
import { Button } from "@mui/material";

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


  return (
    <div className="pageContainer">
      <div className={styles.profilePageContainer}>
        <h1>Profile</h1>
        <h3>{authData?.user?.username}</h3>
        <h3>{authData?.user?.fullname}</h3>
        <Button onClick={handleLogout}>LogOut</Button>
      </div>
    </div>
  );
}
