/* Constantes ----------------------------------------------------- */
const PLATEAU = document.getElementById("plateau_id");

/* Variables ------------------------------------------------------ */
let plateau;

/* Démarage ------------------------------------------------------- */
plateau = new Plateau(Object.values(TAILLES).length, 3, 3);
new Joueur(COULEURS.ROUGE);
creerPlateauHTML();

/* Evènements ----------------------------------------------------- */

/* Fonctions ------------------------------------------------------ */
function creerPlateauHTML() {
    let cellule;
    let ligne;
    let lig;
    let col;

    for (lig = 0; lig < plateau.getNbLigne(); lig++) {
        ligne = document.createElement("div");
        ligne.classList.add("ligne_c");

        for (col = 0; col < plateau.getNbColonne(); col++) {
            cellule = document.createElement("div");
            cellule.classList.add("cellule_c");
            cellule.dataset.ligne = lig;
            cellule.dataset.colonne = col;

            ligne.appendChild(cellule);
        }

        PLATEAU.appendChild(ligne);
    }
}


