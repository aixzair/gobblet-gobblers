// require Enum.js

class Joueur {
    #pions;

    constructor(couleur) {
        let i;
        const couleurs_k = Object.keys(COULEURS);

        if (!Object.values(COULEURS).includes(couleur)) {
            throw new TypeError(`couleur invalide (construtor Joueur)`);
        }

        for (i = 0; i < couleurs_k.length; i++) {
            this.#pions[couleurs_k[i]] = 2;
        }

        console.log(this.#pions);
    }
}
