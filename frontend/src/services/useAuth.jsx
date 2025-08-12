import { useState } from "react";

export default function useAuth() {
  const [authLoading, setAuthLoading] = useState(false);

  const url = "http://localhost:3001/auth";

  const login = (formData) => {
    setAuthLoading(true);

    fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success && result.body.token) {
          localStorage.setItem(
            "auth",
            JSON.stringify({ token: result.body.token, user: result.body.user })
          );
        }
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  };

  const logout = () => {
    localStorage.removeItem("auth");
  };

  return { login, logout , authLoading };
}
