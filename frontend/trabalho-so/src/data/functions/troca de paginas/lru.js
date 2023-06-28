function LRU(processo, tamanhoRam, listaMemoria) {
    const paginas = processo.paginas;
    const listaRAM = listaMemoria;
    let pageFault = 0;

    //Roda enquanto houverem páginas a serem inseridas na Ram
    for (let i = 0; i < paginas.length; i++) {
        //Se a página atual não estivem na Ram
        if (!listaRAM.find(pag => pag.valor == paginas[i])) {

            //Caso a capacidade da Ram não tenha sido atingida
            if (listaRAM.length < tamanhoRam) {
                listaRAM.push({ valor: paginas[i], contador: 1 });
            }
            else{
                //Page fault
                listaRAM.sort((a, b) => a.contador - b.contador);
                listaRAM.shift();
                listaRAM.push({ valor: paginas[i], contador: 1 });
                pageFault += 1;
            }
        }
        else{
            //Página está na RAM, incrementa o contador.
            let indice = listaRAM.findIndex(pag => pag.valor == paginas[i]);
            listaRAM[indice].contador += 1;
        }
        console.log(listaRAM);
    }
    return {pageFault, listaRAM};
}

/* const lista = [
  { valor: 1, contador: 9 },
  { valor: 2, contador: 4 },
  { valor: 3, contador: 6 },
  { valor: 4, contador: 3 },
  { valor: 5, contador: 8 }
]
const process = { paginas: [1, 8, 7, 2, 5, 14, 20, 11, 9, 6]}; 
const tamanhoRam = 5;
 
LRU(process, tamanhoRam, lista);  */

module.exports = {
    LRU
}