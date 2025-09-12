import { useContext, useState } from "react";

import Input from "../../form/Input";
import { Link } from "react-router";

import styles from "../../form/Form.module.css";

//Context
import { Context } from "../../../context/UserContext";

export default function Login() {
  const [userDetails, setUserDetails] = useState({});
  const { login } = useContext(Context);

  function handleChange(e) {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(userDetails);
  }

  return (
    <section className={styles.formContainer}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail:"
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha:"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          handleOnChange={handleChange}
        />
        <Input type="submit" value="Cadastrar" />
      </form>
      <p>
        Não tem conta?<Link to="/register">Clique aqui!</Link>
      </p>
    </section>
  );
}
