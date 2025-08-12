import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { TextField, Button } from "@mui/material";
import useAuth from "../../services/useAuth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState(null);
  const { login, authLoading } = useAuth();

  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem('auth'));

  useEffect(() => {
    if (authData) {
      navigate('/');
    }
  }, [authData])

  const handleFormDataChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    switch (formType) {
      case "login":
        login(formData);
        break;
    }
  };

  if (authLoading) {
    return <h1>Loading...</h1>;
  }

  if (formType === "login") {
    return (
      <div className={styles.authPageContainer}>
        <h1>Login</h1>
        <form onSubmit={handleSubmitForm}>
          <TextField
            required
            label="Username"
            type="text"
            name="username"
            onChange={handleFormDataChange}
          />
          <TextField
            required
            label="Password"
            type="password"
            name="password"
            onChange={handleFormDataChange}
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    );
  }
}
