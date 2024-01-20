/**
 * Equivalant d'une énumération représentant des couleurs
 */
export const COULEURS = Object.freeze({
    AUCUN: 0,
    BLEU: 1,
    ROUGE: 2
});

/**
 * Fonctions utilitaires pour COULEURS
 */
export class COULEURS_F {

    /**
     * Renvoie le nom de la couleur
     * @param {COULEURS} couleur
     * @return {string} nom de la couleur
     */
    static toString(couleur) {
        for (const nom in COULEURS) {
            if (COULEURS[nom] == couleur) {
                return nom;
            }
        }
        return null;
    }
}