const pg = require('pg');
 

const cs = 'postgres://postgres:s$cret@localhost:5432/Mutantes';

const client = new pg.Client(
    {
        host:  'localhost',
        port: 5432,
        database: 'Mutantes',
        user: 'postgres',
        password: '121314',
      }
    
    );
    client
    .connect()
    .then(() => console.log('connected'))
    .catch(err => console.error('connection error', err.stack));






const isMutant = async (genes = []) => {
    const query =  'INSERT INTO estadistica(ismutant,adn) VALUES($1, $2)';


    let diagonal = [undefined, 0];
    let vertical = [undefined, 0];
    let horizontal = [undefined, 0];

    for (let geneIndex = 0; geneIndex < genes.length; geneIndex++) {
        let gene = genes[geneIndex];

        for (let charIndex = 0; charIndex < genes.length; charIndex++) {
            let letter = gene[charIndex];

            if (horizontal[0] != letter) {
                horizontal[0] = letter;
                horizontal[1] = 1;
            }
            else {
                horizontal[0] = letter;
                horizontal[1]++;
            }
            if (horizontal[1] == 4) {
                console.log("Fila: " + geneIndex);
                
                await client.query(query, [true,genes] ,(err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
  })
  return true;
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
                alert("Columna: " + geneIndex);
                await  client.query(query, [true,genes] ,(err, res) => {
                    if (err) {
                      console.log(err.stack)
                    } else {
                      console.log(res.rows[0])
                    }
                  })
                  return true;
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
            console.log("Diagonal: " + geneIndex);
            await   client.query(query, [true,genes] ,(err, res) => {
                if (err) {
                  console.log(err.stack)
                } else {
                  console.log(res.rows[0])
                }
              })
              return true;
        }

        horizontal = [undefined, 0];
        vertical = [undefined, 0];
    }
  await  client.query(query, [true, JSON.stringify(genes)] ,(err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows[0])
        }
      })
      return false;
};

exports.isMutant = isMutant;