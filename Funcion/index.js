const isMutant = async (genes = []) => {
    let diagonal = [undefined, 0];
    let vertical = [undefined, 0];
    let horizontal = [undefined, 0];
    let total = 0;

    //cycle iterating through letter sequences
    for (let geneIndex = 0; geneIndex < genes.length; geneIndex++) {
        let gene = genes[geneIndex];

        //cycle for iterating letters of every sequence
        for (let charIndex = 0; charIndex < genes.length; charIndex++) {
            let letter = gene[charIndex];

            if (horizontal[0] != letter) {
                horizontal[0] = letter;
                horizontal[1] = 1;
            }
            else {
                horizontal[0] = letter;
                horizontal[1] ++;
            }

            if (horizontal[1] == 4) {
                if(++total > 1){
                    return true;
                }
            }

            //vertical
            let lettter = genes[charIndex][geneIndex];
            if (vertical[0] != lettter) {
                vertical[0] = lettter;
                vertical[1] = 1;
            }
            else {
                vertical[0] = lettter;
                vertical[1]++;
            }

            if (vertical[1] == 4) {
                if(++total > 1){
                    return true;
                }
            }
        }

        //diagonal
        let diagLetter = genes[geneIndex][geneIndex];

        if (diagonal[0] != diagLetter) {
            diagonal[0] = diagLetter;
            diagonal[1] = 1;
        }
        else {
            diagonal[0] = diagLetter;
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
