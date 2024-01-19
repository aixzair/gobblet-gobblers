import { COULEURS } from "./enumerations/Couleur.js";
import { TAILLES } from "./enumerations/Taille.js";

export class Joueur {
    #couleur;
    #pions;

    constructor(couleur) {
        if (!Object.values(COULEURS).includes(couleur)) {
            throw new TypeError(`couleur invalide (construtor Joueur)`);
        }
        this.#couleur = couleur;
        this.#pions = [];

        for (const taille in TAILLES) {
            if (TAILLES[taille] === TAILLES.AUCUN) {
                continue;
            }
            this.#pions[taille] = 2
        }
    }

    get couleur() {
        return this.#couleur;
    }

    get pions() {
        return this.#pions;
    }
}
