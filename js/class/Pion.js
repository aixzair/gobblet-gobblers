const TAILLES = Object.freeze({
    PETIT: 0,
    MOYEN: 1,
    GRAND: 2
});

const COULEURS = Object.freeze({
    BLEU: 0,
    ROUGE: 1
});

class Pion {
    #taille;
    #couleur;

    constructor(taille, couleur) {
        if (!(taille instanceof TAILLES)) {
            throw new TypeError("taille invalide (class : Pion)");
        } else if (!(couleur instanceof COULEURS)) {
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