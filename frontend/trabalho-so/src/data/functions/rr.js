const {FIFOPaginas} = require("./troca de paginas/fifo");
/* class processo {
    constructor(tempoChegada, tempoExecucao, deadline) {
      this.tempoChegada = tempoChegada; //tempo de execução
      this.tempoExecucao = tempoExecucao; // tempo de cheegada
      this.deadline = deadline; //prioridade
      this.turnaround = 0;
    }
  }
 */


function escalonamentoRR(processos, quantum, paginasRam, paginasNaRam) {

	let turnaroundTotal = 0;
			
	processos.sort((a, b) => a.tempoChegada - b.tempoChegada);
	
	let tempoAtual = 0;
	const encerrados = []; // usada para o turnaround médio no fim da execução
	
	while (processos.length) {

		
		//tira processo da fila
		const p = processos.shift();
		const {paginasRam, paginasNaRam} = FIFOPaginas(p, 50, paginasRam, paginasNaRam); //Usa troca de páginas FIFO, caso necessário
	
		//caso acabe, atualiza turnaround do processo e o coloca na fila de encerrados
		if (p.tempoExecucao <= quantum) {
			console.log(`Processo executado por ${p.tempoExecucao}ms - Terminado`);
			tempoAtual += p.tempoExecucao;
			p.turnaround = tempoAtual - p.tempoChegada;
			encerrados.push(p);
		} 
		//Caso reste tempo de execução, executa pelo quantum definido e coloca no fim da fila
		else {
			console.log(`Processo executado por ${quantum}ms`);
			p.tempoExecucao -= quantum;
			tempoAtual = tempoAtual + quantum + 1;
			processos.push(p);
			p.turnaround = tempoAtual - p.tempoChegada;
		}
	}

	encerrados.forEach((p) => {
		turnaroundTotal += p.turnaround;
	}); //soma os turnarounds de todos os processos 
	console.log(`Turnaround total: ${turnaroundTotal} quantidade de processos: ${encerrados.length}`);
	const turnaroundMedio = turnaroundTotal / encerrados.length;
	
	return {turnaroundMedio, paginasRam, paginasNaRam};
} //Pega o turnaround médio a partir da soma de turnarounds e do número de processos


/* const processos = [
	new processo(0, 8, 30),
	new processo (2, 6, 30),
	new processo (4, 12, 30)
]; */

/* const turnaroundMedio = escalonamentoRR(processos, 2);
console.log(`Turnaround médio: ${turnaroundMedio.toFixed(2)}ms`); */

module.exports = {
  	escalonamentoRR
}
