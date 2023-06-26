// Define a classe Processo
class Processo {
    constructor(tempoChegada, tempoExecucao, deadline) {
      this.tempoChegada = tempoChegada;
      this.tempoExecucao = tempoExecucao;
      this.deadline = deadline;
      this.turnaround = 0;
      this.completed = false;
    }
  }
  
  // Implementação do algoritmo FIFO
  function escalonamentoFIFO(processos) {
    // Ordena os processos com base no tempo de chegada
    processos.sort((a, b) => a.tempoChegada - b.tempoChegada);
  
    // Variáveis para rastrear o tempo atual, o tempo total de espera e o tempo de execução
    let tempoAtual = 0;
    let tempoEsperaTotal = 0;
    let tempoExecucao = 0;
  
    // Loop pelos processos
    for (const processo of processos) {
  
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
  
    return { tempoExecucaoTotal , qtyProcessos , tempoMedioEspera };
  }
  
  // // Exemplo de uso
  // const processos = [
  //   new Processo(0, 14, 35, 2),
  //   new Processo(0, 4, 15, 5),
  //   new Processo(0, 2, 20, 3),
  //   new Processo(0, 6, 20, 3),
  //   new Processo(0, 8, 25, 1),
  // ];
  
  // const tempoMedioEspera = escalonamentoFIFO(processos);
  // console.log("Tempo médio de espera: " + tempoMedioEspera);

  module.exports = {
    Processo, escalonamentoFIFO
  }
  
