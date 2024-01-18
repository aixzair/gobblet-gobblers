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

    lancer() {
        this.#affichage.creerPlateau();
    }

    jouerCoup(ligne, colonne) {
        this.#plateau.jouerCoup(ligne, colonne);
    }
}
