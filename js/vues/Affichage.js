import { COULEURS } from "../modeles/enumerations/Couleur.js";
import { TAILLES } from "../modeles/enumerations/Taille.js";
import { Jeu } from "./../controleurs/Jeu.js";

export class Affichage {
    #PARTIE_HTML;
    #MENU_PIONS;
    #jeu;

    constructor(jeu) {
        if (!jeu instanceof Jeu) {
            throw new TypeError("jeu doit appartenir à la classe Jeu");
        }
        this.#PARTIE_HTML = document.getElementById("gobblet-gobblers");
        this.#MENU_PIONS = null;
        this.#jeu = jeu;
    }

    creerPartie() {
        this.creerPlateau();
        this.creerMenu();
        this.actualiserMenuPions();
    }

    creerPlateau() {
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
                    e_jeu.jouerCoup(e_lig, e_col, evenement.target);
                });
    
                ligne.appendChild(cellule);
            }

            plateau.appendChild(ligne);
        }

        this.#PARTIE_HTML.appendChild(plateau);
    }

    creerMenu() {
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

    actualiserMenuPions() {
        const joueur = this.#jeu.plateau.joueurActuel;

        // Vide le menu des pions
        while (this.#MENU_PIONS.firstChild) {
            this.#MENU_PIONS.removeChild(this.#MENU_PIONS.firstChild);
        }

        // Ajoute les nouveaux pions
        for (const pionCleTaille in joueur.pions) {
            const pionHTML = this.creerPionHTML(TAILLES[pionCleTaille], joueur.couleur);
            pionHTML.classList.add("gb-menu-pions-item");
            pionHTML.textContent = joueur.pions[pionCleTaille];

            this.#MENU_PIONS.appendChild(pionHTML);
        }
    }

    actualiserCellule(cellule, pion) {
        const pionHTML = document.createElement("div");
        pionHTML.classList.add("gb-pion-petit");
        pionHTML.classList.add("gb-pion-rouge");

        while (cellule.firstChild) {
            cellule.removeChild(cellule.firstChild);
        }
        cellule.appendChild(pionHTML);
    }

    creerPionHTML(taille, couleur) {
        const pion = document.createElement("div");

        switch (couleur) {
        case COULEURS.ROUGE:
            pion.classList.add("gb-pion-rouge");
            break;
        case COULEURS.BLEU:
            pion.classList.add('gb-pion-bleu');
            break;
        default:
            throw new RangeError("La couleur n'est pas valide (Affichage : creerPionHTML)");
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
            throw new RangeError("La taille du pion n'est pas valide (Affichage : creerPionHTML");
        }

        return pion;
    }
}
