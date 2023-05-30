const { Processo, escalonamentoFIFO } = require('./functions/fifo');
const readline = require('readline');

// Cria uma interface de leitura para receber os valores do terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para receber os valores de cada processo
function receberValoresProcessos(qtyProcessos) {
  const processos = [];

  function receberValoresProcesso(index) {
    if (index >= qtyProcessos) {
    // Pergunta sobre o algoritmo de escalonamento
    rl.question('Qual algoritmo de escalonamento você deseja executar? Digite um número: |1- FIFO| |2- SJF| |3- Round Robin| |4- EDF| :', (algoritmo) => {
      executarEscalonamento(processos, parseInt(algoritmo) );
});

      return;
    }

    rl.question(`Digite o tempo de chegada do processo ${index + 1}: `, (tempoChegada) => {
      rl.question(`Digite o tempo de execução do processo ${index + 1}: `, (tempoExecucao) => {
        rl.question(`Digite o deadline do processo ${index + 1}: `, (deadline) => {
          rl.question(`Digite a prioridade do processo ${index + 1}: `, (prioridade) => {
            // Cria o objeto Processo e adiciona ao array
            processos.push(new Processo(parseInt(tempoChegada), parseInt(tempoExecucao), parseInt(deadline), parseInt(prioridade)));

            receberValoresProcesso(index + 1);
          });
        });
      });
    });
  }

  receberValoresProcesso(0);
}

// Função para executar o escalonamento e exibir o resultado
function executarEscalonamento(processos, algoritmo) {
  switch (algoritmo) {
    case 1:
      const result = escalonamentoFIFO(processos);
      console.log("Tempo médio de espera: " + result.tempoExecucaoTotal + " / " + result.qtyProcessos + " = " + result.tempoMedioEspera);
      break;
    case 2:
      console.log("Algoritmo escolhido: SJF");
      break;
    case 3:
      console.log("Algoritmo escolhido: Round Robin");
      break;
    case 4:
      console.log("Algoritmo escolhido: EDF");
      break;
    default:
      console.log("Opção inválida.");
  }
  rl.close();
}

// Pergunta a quantidade de processos
rl.question('Digite a quantidade de processos: ', (qtyProcessos) => {
  receberValoresProcessos(parseInt(qtyProcessos));
});
