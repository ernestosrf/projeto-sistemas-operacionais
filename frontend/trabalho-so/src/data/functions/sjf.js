import { LRU } from "./troca de paginas/lru";
import MemoryTable from "../../memoryTable";

// Implementation of the SJF algorithm
function escalonamentoSJF(processos, qtyProcessosHelper) {
  // Sort the processes based on arrival time
  processos.sort((a, b) => a.tempoChegada - b.tempoChegada);

  // Variables to track the current time, total waiting time and execution time
  let tempoAtual = 0;
  let tempoEsperaTotal = 0;
  let tempoExecucao = 0;

  // Loop through the processes
  while (processos.length > 0) {
    var paginasRam = Array.from({ length: 50 }, () => ({ valor: null, contador: 0, ocupada: false}));
    let faltas = 0;
    // Find the process with the shortest execution time that has arrived
    let shortestProcessIndex = -1;
    for (let i = 0; i < processos.length; i++) {
      if (processos[i].tempoChegada <= tempoAtual) {
        if (shortestProcessIndex === -1 || processos[i].tempoExecucao < processos[shortestProcessIndex].tempoExecucao) {
          shortestProcessIndex = i;
        }
      }
    }

    // If no process has arrived yet, advance the time to the arrival time of the first process
    if (shortestProcessIndex === -1) {
      tempoAtual = processos[0].tempoChegada;
      continue;
    }

    const processo = processos.splice(shortestProcessIndex, 1)[0];

    // Calculate the waiting time of the process
    const tempoEspera = tempoAtual - processo.tempoChegada;
    tempoEsperaTotal += tempoEspera;

    // Update the current time to account for the execution time of the current process
    tempoAtual += processo.tempoExecucao;
    // Update the total execution time
    tempoExecucao += processo.tempoExecucao;
  }

  const tempoExecucaoTotal = tempoEsperaTotal + tempoExecucao;
  const qtyProcessos = parseInt(qtyProcessosHelper);
  // Calculate the average waiting time
  const tempoMedioEspera = (tempoExecucaoTotal) / qtyProcessos;

  return {tempoExecucaoTotal, qtyProcessos, tempoMedioEspera};
}

export {escalonamentoSJF};