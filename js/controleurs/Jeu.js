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
        if (pionHTML.dataset.couleur != this.#plateau.joueurActuel.couleur) {
            return;
        }
        if (this.#pionHTMLSelectionne != null) {
            if(this.#pionHTMLSelectionne.parentNode.classList.contains("gb-cellule")) {
                return;
            }
            this.deselectionnerPion(this.#pionHTMLSelectionne);
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

        const celluleOrigine = this.#pionHTMLSelectionne.parentNode;
        const pion = new Pion(
            this.#plateau.joueurActuel.couleur,
            parseInt(this.#pionHTMLSelectionne.dataset.taille)
        );
        let gagnant;

        // Vérifie si c'est un déplacement
        if (celluleOrigine.classList.contains("gb-cellule")) {
            // Déplacement du pion
            const ligneOrigine = celluleOrigine.dataset.ligne;
            const colonneOrigine = celluleOrigine.dataset.colonne;

            // Vérifie que la cellule source n'est pas la cellule cible
            if (ligne == ligneOrigine && colonne == colonneOrigine) {
                return;
            }

            // Deplace le pion puis actualise l'affichage
            if (!this.#plateau.deplacerPion(ligneOrigine, colonneOrigine, ligne, colonne)) {
                return;
            }
            this.#affichage.actualiserCellule(celluleOrigine, this.plateau.getCellule(ligneOrigine, colonneOrigine));
            this.#affichage.actualiserCellule(cellule, pion);

            this.deselectionnerPion(this.#pionHTMLSelectionne);
        } else {
            // Pose le pion puis actualise l'affichage
            if (!this.#plateau.poserPion(ligne, colonne, pion)) {
                return;
            }
            this.#affichage.actualiserCellule(cellule, pion);
        }

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
