// require Enum.js

class Joueur {
    #pions;

    constructor(couleur) {
        let i;
        const tailles_k = Object.keys(TAILLES);

        if (!Object.values(COULEURS).includes(couleur)) {
            throw new TypeError(`couleur invalide (construtor Joueur)`);
        }

        this.#pions = {};
        for (i = 0; i < tailles_k.length; i++) {
            this.#pions[tailles_k[i]] = 2;
        }

        console.log(this.#pions);
    }
}
