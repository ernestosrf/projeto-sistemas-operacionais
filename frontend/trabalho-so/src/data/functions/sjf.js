function escalonamentoSJF(processos) {
  // Ordena os processos com base no tempo de execução (mais curto primeiro)
  processos.sort((a, b) => a.tempoExecucao < b.tempoExecucao);

  let tempoAtual = 0;
  let tempoEsperaTotal = 0;
  let tempoExecucao = 0;

  for (const processo of processos) {
    if (processo.tempoChegada > tempoAtual) {
      // Se o processo chegou depois do tempo atual, avança o tempo para o momento de chegada do processo
      tempoAtual = processo.tempoChegada;
    }

    const tempoEspera = tempoAtual - processo.tempoChegada;
    tempoEsperaTotal += tempoEspera;

    tempoAtual += processo.tempoExecucao;
    tempoExecucao += processo.tempoExecucao;
  }

  const tempoExecucaoTotal = tempoEsperaTotal + tempoExecucao;
  const qtyProcessos = processos.length;
  const tempoMedioEspera = (tempoExecucaoTotal) / qtyProcessos;

  return { tempoExecucaoTotal, qtyProcessos, tempoMedioEspera };
}

module.exports = {
  escalonamentoSJF
};