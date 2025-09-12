import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

import Logo from "../../assets/img/logo.png";

//Context
import { Context } from "../../context/UserContext";
import { useContext } from "react";

export default function Navbar() {
  const { logout, authenticated } = useContext(Context);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <img src={Logo} alt="Logo do site" />
        <h2>Get A Pet</h2>
      </div>
      <ul>
        <li>
          <Link to="/"> Adotar </Link>
        </li>
        {authenticated ? (
          <>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login"> Entrar </Link>
            </li>
            <li>
              <Link to="/register"> Cadastrar </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
