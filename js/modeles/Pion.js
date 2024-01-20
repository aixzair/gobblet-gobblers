import { COULEURS } from "./enumerations/Couleur.js";
import { TAILLES } from "./enumerations/Taille.js";

/**
 * Classe représentant un pion
 */
export class Pion {
    #taille;
    #couleur;

    /**
     * Créer un nouveau pion
     * @param {COULEURS} couleur 
     * @param {TAILLES} taille 
     */
    constructor(couleur, taille) {
        if (!Object.values(TAILLES).includes(taille)) {
            throw new TypeError("taille invalide (class : Pion)");
        } else if (!Object.values(COULEURS).includes(couleur)) {
            throw new TypeError("couleur invalide (class : Pion)");
        }

        this.#taille = taille;
        this.#couleur = couleur;
    }

    /**
     * Renvoie la taille du pion
     * @return {TAILLES}
     */
    get taille() {
        return this.#taille;
    }

    /**
     * Renvoie la couleur du pion
     * @return {COULEURS}
     */
    get couleur() {
        return this.#couleur;
    }

    /**
     * Indique si le pion est plus grand qu'un autre pion
     * @param {Pion} pionAutre l'autre pion à comparer
     * @return {boolean}
     */
    estPlusGrand(pionAutre) {
        return pionAutre != null
            && pionAutre instanceof Pion
            && pionAutre.#taille < this.#taille;
    }
}
