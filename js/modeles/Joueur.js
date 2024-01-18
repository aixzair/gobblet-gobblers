// require Enum.js

class Joueur {
    #pions;

    constructor(couleur) {
        if (!Object.values(COULEURS).includes(couleur)) {
            throw new TypeError(`couleur invalide (construtor Joueur)`);
        }

        this.#pions = {};
        for (const key in TAILLES) {
            this.#pions[key] = 2;
        }
    }

    getPions() {
        return this.#pions;
    }
}
