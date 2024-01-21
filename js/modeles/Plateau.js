import { COULEURS, COULEURS_F } from "./enumerations/Couleur.js";
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
    #joueurGagant;

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
        this.#joueurGagant = null;
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
     * Renvoie le gagant
     * @return {string}
     */
    get gagnant() {
        return this.#joueurGagant;
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
                    this.#cellules[niv][lig][col] = new Pion(COULEURS.AUCUN, TAILLES.AUCUN);
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
        if (this.#joueurGagant != null) {
            throw new Error("La partie est terminé");
        }

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
        this.#terminerTour();        

        return true;
    }

    /**
     * Déplace le pion d'eune cellule source à une cellule cible
     * @param {int} ligneSource ligne source
     * @param {int} colonneSource colonne source
     * @param {int} ligneCible ligne cible
     * @param {int} colonneCible colonne cible
     * @return {boolean} déplacement effecturé
     */
    deplacerPion(ligneSource, colonneSource, ligneCible, colonneCible) {
        try {
            this.#insererPion(
                ligneCible,
                colonneCible, 
                this.getCellule(ligneSource, colonneSource)
            );
        } catch (error) {
            console.error(error.message);

            return false;
        }

        this.#retirerPion(ligneSource, colonneSource);
        this.#terminerTour();

        return true;
    }

    /**
     * Termine le tour actuel et passe au prochain tour
     */
    #terminerTour() {
        if (!this.#estPartieTermine()) {
            this.#joueurActuel = (this.#joueurActuel + 1) % this.#joueurs.length;
        }
    }

    /**
     * Enregistre le pion du plateau
     * @param {int} ligne ligne du pion
     * @param {int} colonne colonne du pion
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
     * Retire un pion du plateau
     * @param {int} ligne ligne du pion
     * @param {int} colonne colonne du pion
     */
    #retirerPion(ligne, colonne) {
        if (!ligne instanceof Number) {
            throw new TypeError("Ligne n'est pas un nombre.");
        } else if (!colonne instanceof Number) {
            throw new TypeError("Colonne n'est pas un nombre.");
        }

        for (let niveau = this.#nbNiveau - 1; niveau >= 0; niveau--) {
            if (this.#cellules[niveau][ligne][colonne].couleur != COULEURS.AUCUN) {
                this.#cellules[niveau][ligne][colonne] = new Pion(COULEURS.AUCUN, TAILLES.AUCUN);
                break;
            }
        }
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

    /**
     * Renvoie si la partie est terminé
     * @return {boolean} partie terminé
     */
    #estPartieTermine() {
        let victoires = [];
        victoires[this.#joueurs[0].couleur] = 0;
        victoires[this.#joueurs[1].couleur] = 0;

        let numero;
        let couleur;

        // Vérifie les lignes
        for (numero = 0; numero < this.#nbLigne; numero++) {
            if ((couleur = this.#verifierLigne(numero)) != null) {
                victoires[couleur]++;
            }
        }

        // Vérifie les colonnes
        for (numero = 0; numero < this.#nbColonne; numero++) {
            if ((couleur = this.#verifierColonne(numero)) != null) {
                victoires[couleur]++;
            }
        }

        // Vérifie les diagonales
        if ((couleur = this.#verifierDiagonales()) != null) {
            victoires[couleur]++;
        }

        // Si il n'y a pas de gagant
        if (victoires[this.#joueurs[0].couleur] == victoires[this.#joueurs[1].couleur]) {
            return false;
        }

        // Si il y a un gagant
        if (victoires[this.#joueurs[0].couleur] > victoires[this.#joueurs[1].couleur]) {
            this.#joueurGagant = COULEURS_F.toString(this.#joueurs[0].couleur);
        } else {
            this.#joueurGagant = COULEURS_F.toString(this.#joueurs[1].couleur);
        }

        return true;
    }

    /**
     * Vérifie une ligne
     * @param {int} ligne numéro de la ligne
     * @return {string ?} la couleur gagnante
     */
    #verifierLigne(ligne) {
        const couleur = this.getCellule(ligne, 0).couleur;
        if (couleur == COULEURS.AUCUN) {
            return null;
        }
        for (let colonne = 1; colonne < this.#nbColonne; colonne++) {
            if (couleur != this.getCellule(ligne, colonne).couleur) {
                return null;
            }
        }
        return couleur;
    }

    /**
     * Vérifie une colonne
     * @param {int} colonne numéro de la colonne
     * @return {string ?} la couleur gagnante
     */
    #verifierColonne(colonne) {
        const couleur = this.getCellule(0, colonne).couleur;
        if (couleur == COULEURS.AUCUN) {
            return null;
        }
        for (let ligne = 1; ligne < this.#nbLigne; ligne++) {
            if (couleur != this.getCellule(ligne, colonne).couleur) {
                return null;
            }
        }
        return couleur;
    }

    /**
     * Vérifie les diagonales
     * @return {string ?} la couleur gagnante
     */
    #verifierDiagonales() {
        if (this.#nbLigne != this.#nbColonne) {
            return true;
        }

        let couleur;
        let position;

        // Vérifie la première diagonale
        couleur = this.getCellule(0, 0).couleur;
        if (couleur != COULEURS.AUCUN) {
            for (position = 1; position < this.#nbLigne; position++) {
                if (couleur != this.getCellule(position, position).couleur) {
                    couleur = COULEURS.AUCUN;
                    break;
                }
            }
            if (couleur != COULEURS.AUCUN) {
                return couleur;
            }
        }

        // Vérifie la seconde diagonale
        couleur = this.getCellule(0, this.#nbLigne - 1).couleur;
        if (couleur == COULEURS.AUCUN) {
            return null;
        }
        for (position = 1; position < this.#nbLigne; position++) {
            if (couleur != this.getCellule(position, this.#nbLigne - (1 + position)).couleur) {
                return null;
            }
        }

        return couleur;
    }
}
