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
        // Vérifie si un pion est sélectionné
        if (this.#pionHTMLSelectionne == null) {
            return;
        }

        const pion = new Pion(
            this.#plateau.joueurActuel.couleur,
            parseInt(this.#pionHTMLSelectionne.dataset.taille)
        );
        let gagnant;

        // Pose le pion puis actualise l'affichage
        if (!this.#plateau.poserPion(ligne, colonne, pion)) {
            return;
        }
        this.#affichage.actualiserCellule(cellule, pion);

        // Vérifie si il y a un gagant
        if ((gagnant = this.#plateau.gagnant) != null) {
            this.#affichage.terminerPartie(gagnant);

            setTimeout(() => {
                location.reload();
            }, 1000);
        } else {
            this.#pionHTMLSelectionne = null;
            this.#affichage.actualiserMenuPions();
        }
    }
}
