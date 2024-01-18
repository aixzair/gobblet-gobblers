import { TAILLES } from "./enumerations/Taille.js";
import { Pion } from "./Pion.js";

export class Plateau {
    #cellules;
    #nbLigne;
    #nbColonne;
    #nbNiveau;

    constructor(ligne, colonne) {
        if (isNaN(ligne)) {
            throw new TypeError("ligne invalide (constructor : Plateau)");
        } else if (isNaN(colonne)) {
            throw new TypeError("colonne invalide (constructor : Plateau)");
        }

        let niv;
        let lig;
        let col;
        
        this.#nbNiveau = Object.values(TAILLES).length;
        this.#nbLigne = ligne;
        this.#nbColonne = colonne;
        this.#cellules = new Array(this.#nbNiveau);

        for (niv = 0; niv < this.#nbNiveau; niv++) {
            this.#cellules[niv] = new Array(this.#nbLigne);

            for (lig = 0; lig < this.#nbLigne; lig++) {
                this.#cellules[niv][lig] = new Array(this.#nbColonne);

                for (col = 0; col < this.#nbColonne; col++) {
                    this.#cellules[niv][lig][col] = null;
                }
            }
        }
    }

    get nbNiveau() {
        return this.#nbNiveau;
    }

    get nbLigne() {
        return this.#nbLigne;
    }

    get nbColonne() {
        return this.#nbColonne;
    }

    getCellule(ligne, colonne) {
        this.#verifierCoordonnee(ligne, colonne, "(getCellule : Plateau)");

        let niv;
        let cellule = this.#cellules[0][ligne][colonne];

        for (niv = 1; niv < this.#nbNiveau; niv++) {
            if (this.#cellules[niv][ligne][colonne] == null) {
                return cellule;
            } else {
                cellule = this.#cellules[niv][ligne][colonne];
            }
        }

        return cellule;
    }

    jouerCoup(ligne, colonne) {
        console.log("coup = " + ligne + " ; " + colonne);
    }

    #getNiveauLibre(ligne, colonne) {
        for (let niv = 0; niv < this.#nbNiveau; niv++) {
            if (this.#cellules[niv][ligne][colonne] == null) {
                return niv;
            }
        }
        return -1;
    }

    estCaseLibre(ligne, colonne) {
        return this.#getNiveauLibre(ligne, colonne) != -1;
    }

    poserPion(pion, ligne, colonne) {
        this.#verifierCoordonnee(ligne, colonne, "(poserPion : Plateau)");

        if (!(pion instanceof Pion)) {
            throw new TypeError("pion invalide (poserPion : Plateau)");
        }

        const pionDessous = this.getCellule(ligne, colonne);
        const niveauLibre = this.#getNiveauLibre();

        if (pionDessous != null) {
            if (pion.getTaille() <= pionDessous.getTaille()) {
                throw new Error("pion trop petit (poserPion : Plateau)");
            }
        }

        if (niveauLibre == -1) {
            throw new Error("impossible de poser un pion (poserPion : Plateau)");
        }

        this.#cellules[niveauLibre][ligne][colonne] = pion;
    }

    #verifierCoordonnee(ligne, colonne, info) {
        if (isNaN(ligne)) {
            throw new TypeError(`ligne invalide ${info}`);
        } else if (ligne < 0) {
            throw new RangeError(`l'index de ligne ne peux pas être négatif ${info}`);
        } else if (ligne >= this.#nbLigne) {
            throw new RangeError(`l'index de ligne est supérieur au nombre de lignes ${info}`);
        }
        
        if (isNaN(colonne)) {
            throw new TypeError(`colonne invalide ${info}`);
        } else if (colonne < 0) {
            throw new RangeError(`l'index de colonne ne peux pas être négatif ${info}`);
        } else if (colonne >= this.#nbColonne) {
            throw new RangeError(`l'index de colonne est supérieur au nombre de colonnes ${info}`);
        }
    }
}
