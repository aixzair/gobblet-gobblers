import { Pion } from "./../modeles/Pion.js";
import { Plateau } from "./../modeles/Plateau.js";
import { Affichage } from "./../vues/Affichage.js";

/**
 * Gère la coordination entre le plateau et l'affichage
 */
export class Jeu {
    #plateau;
    #affichage;
    #pionHTMLSelectionne;

    /**
     * Créer un nouveau controleur
     */
    constructor() {
        this.#plateau = new Plateau(3, 3);
        this.#affichage = new Affichage(this);
        this.#pionHTMLSelectionne = null;
    }

    /**
     * Récupère le plateau de jeu
     * @return le plateau
     */
    get plateau() {
        return this.#plateau;
    }

    /**
     * Commence une partie
     */
    commencer() {
        this.#affichage.creerPartie();
    }

    /**
     * Sélectionne le pion
     * @param pionHTML un pion afficher à l'écran
     */
    selectionnerPion(pionHTML) {
        if (this.#pionHTMLSelectionne != null) {
            return;
        }

        this.#affichage.selectionnerPion(pionHTML);
        this.#pionHTMLSelectionne = pionHTML;
    }

    /**
     * Déselectionne le pion
     * @param pionHTML un pion
     */
    deselectionnerPion(pionHTML) {
        if (this.#pionHTMLSelectionne == null) {
            return;
        }

        this.#affichage.deselectionnerPion(pionHTML);
        this.#pionHTMLSelectionne = null;
    }

    /**
     * Pose un pion sur le plateau puis l'affiche
     * @param {int} ligne du plateau
     * @param {int} colonne du plateau
     * @param {Pion} cellule affiché
     */
    jouerCoup(ligne, colonne, cellule) {
        if (this.#pionHTMLSelectionne == null) {
            return;
        }
        const pion = new Pion(
            this.#plateau.joueurActuel.couleur,
            parseInt(this.#pionHTMLSelectionne.dataset.taille)
        );

        if (!this.#plateau.poserPion(ligne, colonne, pion)) {
            return;
        }

        this.#pionHTMLSelectionne = null;
        this.#affichage.actualiserCellule(cellule, pion);
        this.#affichage.actualiserMenuPions();
    }
}
