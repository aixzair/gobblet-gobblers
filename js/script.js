/* Constantes ----------------------------------------------------- */
const PLATEAU = document.getElementById("plateau_id");
const NB_COLONNE = 3;
const NB_LIGNE = 3;

/* Variables ------------------------------------------------------ */
let plateau;

/* Démarage ------------------------------------------------------- */
creerPlateauHTML();
initialiserPlateauJS();

/* Evènements ----------------------------------------------------- */

/* Fonctions ------------------------------------------------------ */
function creerPlateauHTML() {
    let cellule;
    let ligne;
    let lig;
    let col;

    for (lig = 0; lig < NB_LIGNE; lig++) {
        ligne = document.createElement("div");
        ligne.classList.add("ligne_c");

        for (col = 0; col < NB_COLONNE; col++) {
            cellule = document.createElement("div");
            cellule.classList.add("cellule_c");
            cellule.dataset.ligne = lig;
            cellule.dataset.colonne = col;

            ligne.appendChild(cellule);
        }

        PLATEAU.appendChild(ligne);
    }
}

function initialiserPlateauJS() {
    let col;
    for (let lig = 0; lig < NB_LIGNE; lig++) {
        for (col = 0; col < NB_COLONNE; col++) {
            col[lig][col] = null;
        }
    }
}

