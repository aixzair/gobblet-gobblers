import { COULEURS } from "./enumerations/Couleur.js";
import { TAILLES } from "./enumerations/Taille.js";

export class Pion {
    #taille;
    #couleur;

    constructor(couleur = COULEURS.AUCUNE, taille = TAILLES.AUCUN) {
        if (!Object.values(TAILLES).includes(taille)) {
            throw new TypeError("taille invalide (class : Pion)");
        } else if (!Object.values(COULEURS).includes(couleur)) {
            throw new TypeError("couleur invalide (class : Pion)");
        }

        this.#taille = taille;
        this.#couleur = couleur;
    }

    get taille() {
        return this.#taille;
    }

    get couleur() {
        return this.#couleur;
    }

    estPlusGrand(pionAutre) {
        return pionAutre != null
            && this.#taille > pionAutre.taille;
    }
}
