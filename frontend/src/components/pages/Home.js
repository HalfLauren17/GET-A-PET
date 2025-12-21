import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Home.module.css";

export default function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api
      .get("/pets")
      .then((response) => {
        setPets(response.data.pets);
      })
      .catch((err) => {});
  }, []);

  return (
    <section>
      <div className={styles.petHomeHeader}>
        <h1>Adote um Pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles</p>
      </div>
      <div className={styles.petContainer}>
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div className={styles.petCard}>
              <div style={{backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`}} className={styles.petCardImage}></div>
              <h3>{pet.name}</h3>
              <p>
                <span className="bold">Peso:</span> {pet.weight}kg
              </p>
              {pet.available ? (
                <Link to={`pet/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p className={styles.adoptedText}>Adotado</p>
              )}
            </div>
          ))
        ) : (
          <p>Não há pets cadastrados ou disponíveis para a adoção no momento</p>
        )}
      </div>
    </section>
  );
}
