// require Enum.js

class Pion {
    #taille;
    #couleur;

    constructor(taille, couleur) {
        if (!Object.values(TAILLES).includes(taille)) {
            throw new TypeError("taille invalide (class : Pion)");
        } else if (!Object.values(COULEURS).includes(couleur)) {
            throw new TypeError("couleur invalide (class : Pion)");
        }

        this.#taille = taille;
        this.#couleur = couleur;
    }

    getTaille() {
        return this.#taille;
    }

    getCouleur() {
        return this.#couleur;
    }
}