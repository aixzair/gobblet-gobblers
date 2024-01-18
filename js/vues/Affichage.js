import { Jeu } from './../controleurs/Jeu.js';

export class Affichage {
    static #PLATEAU_HTML = document.getElementById("plateau_id");
    #jeu;

    constructor(jeu) {
        if (!jeu instanceof Jeu) {
            throw new TypeError("jeu doit appartenir à la classe Jeu");
        }
        this.#jeu = jeu;
    }

    creerPlateau() {
        let cellule;
        let ligne;
        let lig;
        let col;
    
        for (lig = 0; lig < this.#jeu.plateau.nbLigne; lig++) {
            ligne = document.createElement("div");
            ligne.classList.add("ligne_c");
    
            for (col = 0; col < this.#jeu.plateau.nbColonne; col++) {
                const e_jeu = this.#jeu;
                const e_lig = lig;
                const e_col = col;
    
                cellule = document.createElement("div");
                cellule.classList.add("cellule_c");
                cellule.dataset.ligne = lig;
                cellule.dataset.colonne = col;
    
                cellule.addEventListener("click", function() {
                    e_jeu.jouerCoup(e_lig, e_col);
                });
    
                ligne.appendChild(cellule);
            }
    
            Affichage.#PLATEAU_HTML.appendChild(ligne);
        }
    }
}
