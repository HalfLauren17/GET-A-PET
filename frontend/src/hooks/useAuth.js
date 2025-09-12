//API
import api from "../utils/api";

import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import useFlashMessage from "./useFlashMessage";

export default function useAuth() {
  const { setFlashMessage } = useFlashMessage();

  async function register(user) {
    let msgText = "Cadastro realizado com sucesso.";
    let msgType;

    try {
      const data = await api.post("/users/register", user).then((response) => {
        return response.data;
      });
      msgType = "success";
    } catch (error) {
      //Handle error
      msgText = error.response.data.message;
      msgType = "error";
    }

    setFlashMessage(msgText, msgType);
  }

  return { register };
}
