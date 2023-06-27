function FIFO(processo, tamanhoRam) {
    const filaPaginas = [];
    const setPaginas = new Set(); 
    const paginas = processo.paginas
      
    //Roda enquanto houverem páginas a serem inseridas na Ram
    for (let i = 0; i < paginas.length; i++) {
  
          //Se a página atual não estivem na Ram
      if (!setPaginas.has(paginas[i])) {
          
          //Caso a capacidade da Ram tenha sido atingida
        if (filaPaginas.length === tamanhoRam) {
          const pagAntiga = filaPaginas.shift(); //retira página mais antiga
          setPaginas.delete(pagAntiga); //tira a página do conjunto de páginas que já estão na Ram
        }
  
          filaPaginas.push(paginas[i]); //coloca a página atual na Ram
          setPaginas.add(paginas[i]); //coloca a página no site que informa as páginas que estão na Ram
          processo.turnaround += 1; //1 ms no caso de page fault
      }
          console.log(setPaginas);
    }
  
  }
  
  /* const paginas = [1, 8, 7, 2, 5, 14, 20, 11, 9, 6]; 
  const tamanhoRam = 50;
  
  FIFO(paginas, tamanhoRam); */

module.exports = {
  FIFO
}