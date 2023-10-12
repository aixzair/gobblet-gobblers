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
}