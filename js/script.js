/* Constantes ----------------------------------------------------- */
const PLATEAU = document.getElementById("plateau_id");

/* Variables ------------------------------------------------------ */

/* Evènements ----------------------------------------------------- */

/* Démarage ------------------------------------------------------- */
creerPlateauHTML();

/* Fonctions ------------------------------------------------------ */
function creerPlateauHTML() {
    let i;
    const ligne = document.createElement("div");
    const cellule = document.createElement("div");

    ligne.classList.add("ligne_c");
    cellule.classList.add("cellule_c");

    for (i = 0; i < 3; i++) {
        ligne.appendChild(cellule);
    }

    for (i = 0; i < 3; i++) {
        PLATEAU.appendChild(ligne);
    }
}

