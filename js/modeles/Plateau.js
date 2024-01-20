import { COULEURS } from "./enumerations/Couleur.js";
import { TAILLES } from "./enumerations/Taille.js";
import { Joueur } from "./Joueur.js";
import { Pion } from "./Pion.js";

export class Plateau {
    #cellules;
    #nbLigne;
    #nbColonne;
    #nbNiveau;

    #joueurs;
    #joueurActuel;

    constructor(ligne, colonne) {
        if (isNaN(ligne)) {
            throw new TypeError("ligne invalide (constructor : Plateau)");
        } else if (isNaN(colonne)) {
            throw new TypeError("colonne invalide (constructor : Plateau)");
        }
        
        this.#nbNiveau = Object.values(TAILLES).length - 1;
        this.#nbLigne = ligne;
        this.#nbColonne = colonne;
        this.#initialiserCellules();
        
        this.#joueurs = new Array(2);
        this.#joueurs[0] = new Joueur(COULEURS.BLEU);
        this.#joueurs[1] = new Joueur(COULEURS.ROUGE);
        this.#joueurActuel = 0;
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

    get joueurActuel() {
        return this.#joueurs[this.#joueurActuel];
    }

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

    poserPion(ligne, colonne, pion) {
        try {
            this.#insererPion(
                pion,
                ligne,
                colonne
            );
        } catch (error) {
            console.error(error);

            return false;
        }

        this.#joueurs[this.#joueurActuel].retirerPion(pion.taille);
        this.#joueurActuel = (this.#joueurActuel + 1) % this.#joueurs.length;

        return true;
    }

    #insererPion(pion, ligne, colonne) {
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

    #getNiveauLibre(ligne, colonne) {
        for (let niveau = 0; niveau < this.#nbNiveau; niveau++) {
            if (this.#cellules[niveau][ligne][colonne].taille == TAILLES.AUCUN) {
                return niveau;
            }
        }
        return -1;
    }
}
