// require Pion.js

class Plateau {
    #cellules;
    #nbLigne;
    #nbColonne;
    #nbNiveau;

    constructor(niveau, ligne, colonne) {
        if (isNaN(niveau)) {
            throw new TypeError("niveau invalide (constructor : Plateau)");
        } else if (isNaN(ligne)) {
            throw new TypeError("ligne invalide (constructor : Plateau)");
        } else if (isNaN(colonne)) {
            throw new TypeError("colonne invalide (constructor : Plateau)");
        }

        let niv;
        let lig;
        let col;
        
        this.#nbNiveau = niveau;
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

    getNbNiveau() {
        return this.#nbNiveau;
    }

    getNbLigne() {
        return this.#nbLigne;
    }

    getNbColonne() {
        return this.#nbColonne;
    }

    getCellule(ligne, colonne) {
        this.#checkCoordonnee(ligne, colonne, "(getCellule : Plateau)");

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
        this.#checkCoordonnee(ligne, colonne, "(poserPion : Plateau)");

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

    #checkCoordonnee(ligne, colonne, info) {
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