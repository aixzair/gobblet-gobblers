import { COULEURS } from "./enumerations/Couleur.js";

export class Joueur {
    #couleur;

    constructor(couleur) {
        if (!Object.values(COULEURS).includes(couleur)) {
            throw new TypeError(`couleur invalide (construtor Joueur)`);
        }
        this.#couleur = couleur;
    }

    get couleur() {
        return this.#couleur;
    }
}
