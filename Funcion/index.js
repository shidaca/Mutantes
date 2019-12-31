const isMutant = async (ADN = []) => {
    let diagonal = [undefined, 0];
    let vertical = [undefined, 0];
    let horizontal = [undefined, 0];
    let total = 0;

    //Ciclo para recorrer ADN
    for (let adnIndex = 0; adnIndex < ADN.length; adnIndex++) {
        let gen = ADN[adnIndex];

        //Ciclo para recorrer letras del ADN
        for (let charIndex = 0; charIndex < ADN.length; charIndex++) {
            let letraHorizontal = gen[charIndex];

            if (horizontal[0] != letraHorizontal) {
                horizontal[0] = letraHorizontal;
                horizontal[1] = 1;
            }
            else {
                horizontal[0] = letraHorizontal;
                horizontal[1] ++;
            }

            if (horizontal[1] == 4) {
                if(++total > 1){
                    return true;
                }
            }

            //vertical
            let letraVertical = ADN[charIndex][adnIndex];
            if (vertical[0] != letraVertical) {
                vertical[0] = letraVertical;
                vertical[1] = 1;
            }
            else {
                vertical[0] = letraVertical;
                vertical[1]++;
            }

            if (vertical[1] == 4) {
                if(++total > 1){
                    return true;
                }
            }
        }

        //diagonal
        let letraDiagonal = ADN[adnIndex][adnIndex];

        if (diagonal[0] != letraDiagonal) {
            diagonal[0] = letraDiagonal;
            diagonal[1] = 1;
        }
        else {
            diagonal[0] = letraDiagonal;
            diagonal[1]++;
        }

        if (diagonal[1] == 4) {
            if(++total > 1){
                return true;
            }
        }

        horizontal = [undefined, 0];
        vertical = [undefined, 0];
    }

    return false;
};

exports.isMutant = isMutant;
