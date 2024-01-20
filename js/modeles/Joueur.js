import { COULEURS } from "./enumerations/Couleur.js";
import { TAILLES } from "./enumerations/Taille.js";

export class Joueur {
    #couleur;
    #pions;

    constructor(couleur) {
        if (!Object.values(COULEURS).includes(couleur)) {
            throw new TypeError("Couleur invalide.");
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

    retirerPion(taille) {
        if (taille == TAILLES.AUCUN) {
            throw new RangeError("Impossible de retirer un pion n'ayant pas de taille.");
        }
        for (const tailleCle in TAILLES) {
            if (TAILLES[tailleCle] === taille) {
                if (this.#pions[tailleCle] <= 0) {
                    throw new RangeError("Impossible de retirer un pion qu'il ne possède pas.");
                } else {
                    this.#pions[tailleCle]--;
                    return;
                }
            }
        }
    }
}
