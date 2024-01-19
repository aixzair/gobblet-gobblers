import { Plateau } from "./../modeles/Plateau.js";
import { Affichage } from "./../vues/Affichage.js"

export class Jeu {
    #plateau;
    #affichage;

    constructor() {
        this.#plateau = new Plateau(3, 3);
        this.#affichage = new Affichage(this);
    }

    get plateau() {
        return this.#plateau;
    }

    commencer() {
        this.#affichage.creerPartie();
    }

    jouerCoup(ligne, colonne, cellule) {
        const pion = this.#plateau.jouerCoup(ligne, colonne);

        if (pion != null) {
            this.#affichage.actualiserCellule(cellule, pion);
        }
        
    }
}
