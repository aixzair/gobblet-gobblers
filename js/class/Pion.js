const TAILLES = Object.freeze({
    PETIT: 0,
    MOYEN: 1,
    GRAND: 2,

    include(taille) {
        return (
            TAILLES.PETIT === taille
            || TAILLES.MOYEN === taille
            || TAILLES.GRAND === taille
        );
    }
});

const COULEURS = Object.freeze({
    BLEU: 0,
    ROUGE: 1,

    include(couleur) {
        return (
            COULEURS.BLEU === couleur
            || COULEURS.ROUGE === couleur
        );
    }
});

class Pion {
    #taille;
    #couleur;

    constructor(taille, couleur) {
        if (!TAILLES.include(taille)) {
            throw new TypeError("taille invalide (class : Pion)");
        } else if (!COULEURS.include(couleur)) {
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