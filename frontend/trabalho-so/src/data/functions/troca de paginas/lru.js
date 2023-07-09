function LRU(processo, listaMemoria) {
    const paginas = processo.paginas;
    const listaRAM = listaMemoria;
    let pageFault = 0;

    //Roda enquanto houverem páginas a serem inseridas na Ram
    for (let i = 0; i < paginas.length; i++) {
        //Se a página atual não estivem na Ram
        if (!listaRAM.find(pag => pag.valor === paginas[i])) {
            //Caso a capacidade da Ram tenha sido atingida
            if (!listaRAM.find(pag => pag.ocupada === false)) {
                const minIndex = listaRAM.reduce((minIndex, obj, currentIndex) => {
                    if (obj.contador < listaRAM[minIndex].contador) {
                      return currentIndex;
                    } else {
                      return minIndex;
                    }
                }, 0);             
                listaRAM[minIndex] = {valor: paginas[i], contador: 0, ocupada: true};
                pageFault += 1;
            }
            else{
               const p = listaRAM.findIndex(pag => pag.ocupada === false);
               listaRAM[p] = {valor: paginas[i], contador: 0, ocupada: true};
            }
        }
        else{
            //Página está na RAM, incrementa o contador.
            let indice = listaRAM.findIndex(pag => pag.valor === paginas[i]);
            listaRAM[indice].contador += 1;
        }
    }
    return [pageFault, listaRAM];
}

/*const lista = [
  { valor: 1, contador: 9, ocupada: true},
  { valor: 2, contador: 4, ocupada: true},
  { valor: 3, contador: 6, ocupada: true},
  { valor: 4, contador: 3, ocupada: true},
  { valor: 5, contador: 8, ocupada: true},
  { valor: null, contador: 0, ocupada: false},
  { valor: null, contador: 0, ocupada: false}
]
const process = { paginas: [1, 8, 7, 2, 5, 8, 7, 14, 20, 11, 9, 6]}; 

LRU(process, lista);  
 */

module.exports = {
    LRU
}