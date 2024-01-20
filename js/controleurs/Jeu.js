import { Pion } from "./../modeles/Pion.js";
import { Plateau } from "./../modeles/Plateau.js";
import { Affichage } from "./../vues/Affichage.js";

export class Jeu {
    #plateau;
    #affichage;
    #pionHTMLSelectionne;

    constructor() {
        this.#plateau = new Plateau(3, 3);
        this.#affichage = new Affichage(this);
        this.#pionHTMLSelectionne = null;
    }

    get plateau() {
        return this.#plateau;
    }

    commencer() {
        this.#affichage.creerPartie();
    }

    selectionnerPion(pionHTML) {
        if (this.#pionHTMLSelectionne != null) {
            return;
        }

        this.#affichage.selectionnerPion(pionHTML);
        this.#pionHTMLSelectionne = pionHTML;
    }

    deselectionnerPion(pionHTML) {
        if (this.#pionHTMLSelectionne == null) {
            return;
        }

        this.#affichage.deselectionnerPion(pionHTML);
        this.#pionHTMLSelectionne = null;
    }

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
