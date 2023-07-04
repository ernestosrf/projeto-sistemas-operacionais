function FIFOPaginas(processo, tamanhoRam, paginasRam, paginasNaRam) {
  const paginas = processo.paginas
    
  //Roda enquanto houverem páginas a serem inseridas na Ram
  for (let i = 0; i < paginas.length; i++) {

        //Se a página atual não estivem na Ram
    if (!paginasNaRam.has(paginas[i])) {
        
        //Caso a capacidade da Ram tenha sido atingida
      if (paginasRam.length === tamanhoRam) {
        const pagAntiga = paginasRam.shift(); //retira página mais antiga
        paginasNaRam.delete(pagAntiga); //tira a página do conjunto de páginas que já estão na Ram
      }

        paginasRam.push(paginas[i]); //coloca a página atual na Ram
        paginasNaRam.add(paginas[i]); //coloca a página no set que informa as páginas que estão na Ram
        processo.turnaround += 1; //1 ms no caso de page fault
    }
      return {paginasRam, paginasNaRam};
  }

}

/* const paginas = [1, 8, 7, 2, 5, 14, 20, 11, 9, 6]; 
const tamanhoRam = 50;

FIFO(paginas, tamanhoRam); */

module.exports = {
  FIFOPaginas
}