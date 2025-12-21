import api from "../../../utils/api";

import styles from "./Dashboard.module.css";

import { useState, useEffect } from "react";

import RoundedImage from "../../layouts/RoundedImage";

function MyAdoptions() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/pets/myadoptions", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      })
      .catch((err) => {});
  }, [token]);

  return (
    <section>
      <div className={styles.petListHeader}>
        <h1>Minhas Adoções</h1>
      </div>
      <div className={styles.petListContainer}>
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div className={styles.petListRow} key={pet._id}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.contacts}>
                <p>
                    <span className="bold">Ligue para:</span> {pet.user.phone} 
                </p>
                <p>
                    <span className="bolde">Fale com:</span> {pet.user.name}
                </p>
              </div>
              <div className={styles.actions}>
                {pet.available ? (
                  <p>Adoção em processo</p>
                ) : (
                  <p>Parabéns por concluir a adoção!</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Ainda não há adoções de Pets.</p>
        )}
      </div>
    </section>
  );
}

export default MyAdoptions;
