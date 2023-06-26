class Processo {
    constructor(id, te, tc, pr) {
      this.id = id;
      this.te = te; //tempo de execução
      this.tc = tc; // tempo de cheegada
      this.pr = pr; //prioridade
      this.turnaround = 0;
    }
  }
  
  class RoundRobin {
    constructor(quantum) {
      this.processos = [];
      this.quantum = quantum;
      this.turnaroundTotal = 0;
    }
  
    inserir(id, te, tc, pr) {
      const p = new Processo(id, te, tc, pr);
      this.processos.push(p);
    }
  
    escalonar() {
      this.processos.sort((a, b) => a.tc - b.tc);
    }
  
    executar() {
      this.escalonar();
  
      let tempoAtual = 0;
          const encerrados = []; // usada para o turnaround médio no fim da execução
  
      while (this.processos.length) {
              
              //tira processo da fila
        const p = this.processos.shift();
              
  
        console.log(`Executando processo ${p.id}`);
  
              //caso acabe, atualiza turnaround do processo e o coloca na fila de encerrados
        if (p.te <= this.quantum) {
          console.log(`Processo ${p.id} executado por ${p.te}ms - Terminado`);
          tempoAtual += p.te;
          p.turnaround = tempoAtual - p.tc;
                  encerrados.push(p);
        } 
              //Caso reste tempo de execução, executa pelo quantum definido e coloca no fim da fila
              else {
          console.log(`Processo ${p.id} executado por ${this.quantum}ms`);
          p.te -= this.quantum;
          tempoAtual += this.quantum;
          this.processos.push(p);
          p.turnaround = tempoAtual - p.tc;
        }
      }
  
      encerrados.forEach((p) => {
        this.turnaroundTotal += p.turnaround;
      }); //soma os turnarounds de todos os processos 
      console.log(`Turnaround total: ${this.turnaroundTotal} quantidade de processos: ${encerrados.length}`);
      const turnaroundMedio = this.turnaroundTotal / encerrados.length;
      console.log(`Turnaround médio: ${turnaroundMedio.toFixed(2)}ms`);
    } //Pega o turnaround médio a partir da soma de turnarounds e do número de processos
  
    alterarQuantum(quantum) {
      this.quantum = quantum;
      console.log(`Quantum alterado para ${this.quantum}ms`);
    }
  }
  
  // const rr = new RoundRobin(3);
  // rr.inserir(0, 8, 0, 1);
  // rr.alterarQuantum(2);
  // rr.inserir(1, 6, 2, 1);
  // rr.inserir(2, 12, 4, 1);
  // rr.executar();

// Implementação do algoritmo Round Robin (RR)
// function escalonamentoRR(processos, quantum) {
//   processos.sort((a, b) => a.tempoChegada - b.tempoChegada);

//   let tempoAtual = 0;
//   let tempoEsperaTotal = 0;
//   let tempoExecucao = 0;

//   const filaProcessos = [...processos];

//   while (filaProcessos.length > 0) {
//     const processo = filaProcessos.shift();

//     if (processo.tempoChegada > tempoAtual) {
//       tempoAtual = processo.tempoChegada;
//     }

//     const tempoEspera = tempoAtual - processo.tempoChegada;
//     tempoEsperaTotal += tempoEspera;

//     if (processo.tempoExecucao <= quantum) {
//       tempoAtual += processo.tempoExecucao;
//       tempoExecucao += processo.tempoExecucao;
//     } else {
//       tempoAtual += quantum;
//       tempoExecucao += quantum;

//       processo.tempoExecucao -= quantum;

//       filaProcessos.push(processo);
//     }
//   }

//   const tempoExecucaoTotal = tempoExecucao;
//   const qtyProcessos = processos.length;
//   const tempoMedioEspera = tempoEsperaTotal / qtyProcessos;

//   return { tempoExecucaoTotal, qtyProcessos, tempoMedioEspera };
// }

function escalonamentoRR (processos, quantum) {
  let tempoTotal = 0;
  let tempoEspera = new Array(processos.length).fill(0);
  let tempoExecutado = new Array(processos.length).fill(0);

  // Execução do escalonamento Round Robin
  while (true) {
    let concluido = true;

    for (let i = 0; i < processos.length; i++) {
      const processo = processos[i];

      if (tempoExecutado[i] < processo.tempoExecucao) {
        concluido = false;

        if (processo.tempoExecucao - tempoExecutado[i] > quantum) {
          tempoTotal += quantum;
          tempoExecutado[i] += quantum;
        } else {
          tempoTotal += processo.tempoExecucao - tempoExecutado[i];
          tempoExecutado[i] = processo.tempoExecucao;
        }
      }
    }

    if (concluido) {
      break;
    }
  }

  return tempoTotal;
}

module.exports = {
  escalonamentoRR
};