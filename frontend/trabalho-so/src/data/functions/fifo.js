import { LRU } from "./troca de paginas/lru";
import MemoryTable from "../../memoryTable";

// Define a classe Processo
class Processo {
    constructor(tempoChegada, tempoExecucao, deadline, paginas) {
      this.tempoChegada = tempoChegada;
      this.tempoExecucao = tempoExecucao;
      this.deadline = deadline;
      this.turnaround = 0;
      this.paginas = paginas;
      this.completed = false;
    }
  }
  
  // Implementação do algoritmo FIFO
  function escalonamentoFIFO(processos) {
    // Ordena os processos com base no tempo de chegada
    processos.sort((a, b) => a.tempoChegada - b.tempoChegada);
    var paginasRam = Array.from({ length: 50 }, () => ({ valor: null, contador: 0, ocupada: false}));
    let faltas = 0;
    // Variáveis para rastrear o tempo atual, o tempo total de espera e o tempo de execução
    let tempoAtual = 0;
    let tempoEsperaTotal = 0;
    let tempoExecucao = 0;
    
  
    // Loop pelos processos
    for (const processo of processos) {
      [faltas, paginasRam] = LRU(processo, paginasRam);

      // Verifica se o processo chegou antes do tempo atual
      if (processo.tempoChegada > tempoAtual) {
        // Se o processo chegou depois do tempo atual, avança o tempo para o momento de chegada do processo
        tempoAtual = processo.tempoChegada;
      }
  
      // Calcula o tempo de espera do processo
      const tempoEspera = tempoAtual - processo.tempoChegada;
      tempoEsperaTotal += tempoEspera;
  
      // Atualiza o tempo atual para levar em conta o tempo de execução do processo atual
      tempoAtual += processo.tempoExecucao;
      // Atualiza o tempo total de execucao
      tempoExecucao += processo.tempoExecucao;
    }
  
    const tempoExecucaoTotal = tempoEsperaTotal + tempoExecucao;
    const qtyProcessos = processos.length;
    // Calcula o tempo médio de espera
    const tempoMedioEspera = (tempoExecucaoTotal) / qtyProcessos;
    const memoryTableComponents = (
      <MemoryTable paginasRam={paginasRam} />
    );
  
    return {tempoExecucaoTotal , qtyProcessos , tempoMedioEspera, memoryTableComponents};
  }
  

  export { Processo, escalonamentoFIFO };