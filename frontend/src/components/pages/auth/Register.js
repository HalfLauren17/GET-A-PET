import Input from "../../form/Input";
import {Link} from "react-router";

import styles from "../../form/Form.module.css";

export default function Register() {
  function handleChange(e) {}

  return (
    <section className={styles.formContainer}>
      <h1>Registrar</h1>
      <form>
        <Input
          text="Nome:"
          type="text"
          name="name"
          placeholder="Digite seu nome"
          handleOnChange={handleChange}
        />
        <Input
          text="Telefone:"
          type="text"
          name="phone"
          placeholder="Digite seu telefone"
          handleOnChange={handleChange}
        />
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
        <Input
          text="Confirmação de senha:"
          type="password"
          name="confirmPassword"
          placeholder="Confirme sua senha"
          handleOnChange={handleChange}
        />
        <Input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já tem conta?<Link to="/login">Clique aqui!</Link>
      </p>
    </section>
  );
}
