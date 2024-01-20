import { COULEURS } from "./enumerations/Couleur.js";
import { TAILLES } from "./enumerations/Taille.js";
import { Joueur } from "./Joueur.js";
import { Pion } from "./Pion.js";

/**
 * Gère les pions sur le plateau
 * (Un plateau est composé de cellules (cases))
 */
export class Plateau {
    #cellules;
    #nbLigne;
    #nbColonne;
    #nbNiveau;

    #joueurs;
    #joueurActuel;

    /**
     * Construit un nouveau plateau
     * @param {int} nbLigne nombre de lignes
     * @param {int} nbColonne nombre de colonnes
     */
    constructor(nbLigne, nbColonne) {
        if (isNaN(nbLigne)) {
            throw new TypeError("ligne invalide (constructor : Plateau)");
        } else if (isNaN(nbColonne)) {
            throw new TypeError("colonne invalide (constructor : Plateau)");
        }
        
        this.#nbNiveau = Object.values(TAILLES).length - 1;
        this.#nbLigne = nbLigne;
        this.#nbColonne = nbColonne;
        this.#initialiserCellules();
        
        this.#joueurs = new Array(2);
        this.#joueurs[0] = new Joueur(COULEURS.BLEU);
        this.#joueurs[1] = new Joueur(COULEURS.ROUGE);
        this.#joueurActuel = 0;
    }

    /**
     * Renvoie le nombre de niveaux
     * @return {int}
     */
    get nbNiveau() {
        return this.#nbNiveau;
    }

    /**
     * Renvoie le nombre de lignes
     * @return {int}
     */
    get nbLigne() {
        return this.#nbLigne;
    }

    /**
     * Renvoie le nombre de colonnes
     * @return {int}
     */
    get nbColonne() {
        return this.#nbColonne;
    }

    /**
     * Renvoie le joueur actuel
     * @return {Joueur}
     */
    get joueurActuel() {
        return this.#joueurs[this.#joueurActuel];
    }

    /**
     * Place sur le plateau des pions n'ayant pas de taille
     */
    #initialiserCellules() {
        let niv;
        let lig;
        let col;

        this.#cellules = new Array(this.#nbNiveau);

        for (niv = 0; niv < this.#nbNiveau; niv++) {
            this.#cellules[niv] = new Array(this.#nbLigne);

            for (lig = 0; lig < this.#nbLigne; lig++) {
                this.#cellules[niv][lig] = new Array(this.#nbColonne);

                for (col = 0; col < this.#nbColonne; col++) {
                    this.#cellules[niv][lig][col] = new Pion(COULEURS.AUCUNE, TAILLES.AUCUN);
                }
            }
        }
    }

    /**
     * Pose un pion sur le plateau
     * @param {int} ligne sur le plateau
     * @param {int} colonne sur le plateau
     * @param {Pion} pion à poser
     * @return {boolean} si le pion est posé
     */
    poserPion(ligne, colonne, pion) {
        try {
            this.#insererPion(
                ligne,
                colonne,
                pion
            );
        } catch (error) {
            console.error(error.message);

            return false;
        }

        this.#joueurs[this.#joueurActuel].retirerPion(pion.taille);
        this.#joueurActuel = (this.#joueurActuel + 1) % this.#joueurs.length;

        return true;
    }

    /**
     * Enregistre le pion dans le plateau
     * @param {int} ligne ligne sur le plateau
     * @param {int} colonne colonne sur le plateau
     * @param {Pion} pion pion à insérrer
     */
    #insererPion(ligne, colonne, pion) {
        if (!pion instanceof Pion) {
            throw new TypeError("Pion invalide.");
        } else if (!ligne instanceof Number) {
            throw new TypeError("Ligne n'est pas un nombre.");
        } else if (!colonne instanceof Number) {
            throw new TypeError("Colonne n'est pas un nombre.");
        }

        const pionDessous = this.getCellule(ligne, colonne);
        const niveauLibre = this.#getNiveauLibre(ligne, colonne);

        if (!pion.estPlusGrand(pionDessous)) {
            throw new RangeError("Pion trop petit.");
        }

        if (niveauLibre == -1) {
            throw new Error("Impossible de poser un pion.");
        }

        this.#cellules[niveauLibre][ligne][colonne] = pion;
    }

    /**
     * Récupère le pion sur une cellule
     * @param {int} ligne ligne de la cellule
     * @param {int} colonne colonne de la cellule
     * @return {Pion}
     */
    getCellule(ligne, colonne) {
        let cellule = null;

        for (let niveau = this.#nbNiveau - 1; niveau >= 0; niveau--) {
            cellule = this.#cellules[niveau][ligne][colonne];

            if (cellule.taille != TAILLES.AUCUN) {
                return cellule;
            }
        }
        return cellule;
    }

    /**
     * Renvoie le niveau libre sur une cellule
     * @param {int} ligne de la cellule
     * @param {int} colonne de la cellule
     * @return {int}
     */
    #getNiveauLibre(ligne, colonne) {
        for (let niveau = 0; niveau < this.#nbNiveau; niveau++) {
            if (this.#cellules[niveau][ligne][colonne].taille == TAILLES.AUCUN) {
                return niveau;
            }
        }
        return -1;
    }
}
