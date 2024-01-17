import { Plateau } from './modeles/Plateau.js';
import { TAILLES } from './class/Enums.js'

/* Constantes ----------------------------------------------------- */
const PLATEAU_HTML = document.getElementById("plateau_id");

/* Variables ------------------------------------------------------ */
const plateau  = new Plateau(Object.values(TAILLES).length, 3, 3);

/* Démarage ------------------------------------------------------- */
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
            const e_lig = lig;
            const e_col = col;

            cellule = document.createElement("div");
            cellule.classList.add("cellule_c");
            cellule.dataset.ligne = lig;
            cellule.dataset.colonne = col;

            cellule.addEventListener("click", function() {
                plateau.jouerCoup(e_lig, e_col);
            });

            ligne.appendChild(cellule);
        }

        PLATEAU_HTML.appendChild(ligne);
    }
}
