import { COULEURS } from "../modeles/enumerations/Couleur.js";
import { TAILLES } from "../modeles/enumerations/Taille.js";
import { Jeu } from "./../controleurs/Jeu.js";

/**
 * Gère l'affiche d'une partie
 */
export class Affichage {
    #PARTIE_HTML;
    #MENU_PIONS;
    #jeu;

    /**
     * Fonction délcanché lorsqu'on clique sur un pion
     */
    #onSelectionnerPion;

    /**
     * Fonction délcanché lorsqu'on clique sur un pion sélectionné
     */
    #onDeselectionnerPion;

    /**
     * Créer un affichage pour un jeu
     * @param {Jeu} jeu à afficher
     */
    constructor(jeu) {
        if (!jeu instanceof Jeu) {
            throw new TypeError("jeu doit appartenir à la classe Jeu");
        }
        this.#PARTIE_HTML = document.getElementById("gobblet-gobblers");
        this.#MENU_PIONS = null;
        this.#jeu = jeu;

        // Evenements
        this.#onSelectionnerPion = function(evenement) {
            jeu.selectionnerPion(evenement.target);
        };
        this.#onDeselectionnerPion = function(evenement) {
            jeu.deselectionnerPion(evenement.target);
        };
    }

    /**
     * Créer les différents composants visuels de la partie
     */
    creerPartie() {
        this.#creerPlateau();
        this.#creerMenu();
        this.actualiserMenuPions();
    }

    /**
     * Créer l'interface du plateau
     */
    #creerPlateau() {
        const plateau = document.createElement("div");
        plateau.id = "gb-plateau";

        let cellule;
        let ligne;
        let lig;
        let col;
    
        for (lig = 0; lig < this.#jeu.plateau.nbLigne; lig++) {
            ligne = document.createElement("div");
            ligne.classList.add("gb-ligne");
    
            for (col = 0; col < this.#jeu.plateau.nbColonne; col++) {
                const e_jeu = this.#jeu;
                const e_lig = lig;
                const e_col = col;
    
                cellule = document.createElement("div");
                cellule.classList.add("gb-cellule");
                cellule.dataset.ligne = lig;
                cellule.dataset.colonne = col;
    
                cellule.addEventListener("click", function(evenement) {
                    let element = evenement.target;

                    if (!element.classList.contains("gb-cellule")) {
                        element = element.parentNode;
                    }

                    e_jeu.jouerCoup(e_lig, e_col, element);
                });
    
                ligne.appendChild(cellule);
            }

            plateau.appendChild(ligne);
        }

        this.#PARTIE_HTML.appendChild(plateau);
    }

    /**
     * Créer le menu ou son affiché les pions du joueur
     */
    #creerMenu() {
        const titre = document.createElement("h2");
        const menu = document.createElement("div");

        titre.textContent = "Vos pions";
        menu.appendChild(titre);
        
        this.#MENU_PIONS = document.createElement("div");
        this.#MENU_PIONS.id = "gb-menu-pions";
        menu.appendChild(this.#MENU_PIONS);        
        
        menu.id ="gb-menu";
        this.#PARTIE_HTML.appendChild(menu);
    }

    /**
     * Actualise les pions du joueur lorsque le joueur change
     */
    actualiserMenuPions() {
        const joueur = this.#jeu.plateau.joueurActuel;

        // Vide le menu des pions
        while (this.#MENU_PIONS.firstChild) {
            this.#MENU_PIONS.removeChild(this.#MENU_PIONS.firstChild);
        }

        // Ajoute les nouveaux pions
        for (const pionCleTaille in joueur.pions) {
            if (joueur.pions[pionCleTaille] <= 0) {
                continue;
            }

            const pionHTML = this.#creerPionHTML(TAILLES[pionCleTaille], joueur.couleur);

            pionHTML.classList.add("gb-menu-pions-item");
            pionHTML.textContent = joueur.pions[pionCleTaille];
            pionHTML.addEventListener("click", this.#onSelectionnerPion);
            this.#MENU_PIONS.appendChild(pionHTML);
        }
    }

    /**
     * Actualise une cellule quand celle-ci change
     * @param {HTML} cellule à actualiser
     * @param {Pion} pion à afficher
     */
    actualiserCellule(cellule, pion) {
        while (cellule.firstChild) {
            cellule.removeChild(cellule.firstChild);
        }

        if (pion.couleur == COULEURS.AUCUN) {
            return;
        }

        const pionHTML = this.#creerPionHTML(
            pion.taille,
            pion.couleur
        );
        pionHTML.addEventListener("click", this.#onSelectionnerPion);
        cellule.appendChild(pionHTML);
    }

    /**
     * Créer un pion HTML
     * @param {TAILLES} taille du pion
     * @param {COULEURS} couleur du pion
     * @return {HTML}
     */
    #creerPionHTML(taille, couleur) {
        const pion = document.createElement("div");

        switch (couleur) {
        case COULEURS.ROUGE:
            pion.classList.add("gb-pion-rouge");
            break;
        case COULEURS.BLEU:
            pion.classList.add('gb-pion-bleu');
            break;
        default:
            throw new RangeError("La couleur n'est pas valide.");
        }

        switch (taille) {
        case TAILLES.PETIT:
            pion.classList.add("gb-pion-petit");
            break;
        case TAILLES.MOYEN:
            pion.classList.add("gb-pion-moyen");
            break;
        case TAILLES.GRAND:
            pion.classList.add("gb-pion-grand");
            break;
        default:
            throw new RangeError("La taille du pion n'est pas valide.");
        }

        pion.dataset.couleur = couleur;
        pion.dataset.taille = taille;

        return pion;
    }

    /**
     * Grise un pion HTML
     * @param {HTML} pionHTML à griser
     */
    selectionnerPion(pionHTML) {
        pionHTML.classList.add("gb-pion-selectionner");
        pionHTML.removeEventListener("click", this.#onSelectionnerPion);
        pionHTML.addEventListener("click", this.#onDeselectionnerPion);
    }

    /**
     * Dégrise un pion HTML
     * @param {HTML} pionHTML à dégriser
     */
    deselectionnerPion(pionHTML) {
        pionHTML.classList.remove("gb-pion-selectionner");
        pionHTML.removeEventListener("click", this.#onDeselectionnerPion);
        pionHTML.addEventListener("click", this.#onSelectionnerPion);
    }

    /**
     * Affiche le gagant
     * @param {string} gagnant le gagnant de la partie
     */
    terminerPartie(gagnant) {
        setTimeout(() => {
            alert(`Bravo à ${gagnant}, le gagnant !`);
        }, 500);
    }
}
