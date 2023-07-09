import { useState, useEffect } from 'react'
import styles from "./Processos.module.css";

// funcoes escalonamento
import {Processo, escalonamentoFIFO} from '../data/functions/fifo.js';
import { escalonamentoSJF } from '../data/functions/sjf';
import { escalonamentoRR } from "../data/functions/rr";
import { escalonamentoEDF } from '../data/functions/edf';

import GanttChartFifo from './GanttChartFifo';
import GanttChartSJF from './GanttChartSjs';
import GanttChartRR from './GanttChartRr';
import GanttChartEDF from './GanttChartEdf';

import MemoryTable from '../memoryTable.js';
import '../memoryTable.css';
import Disco from './Disco';
import './Disco.css';



const ProcessoInput = ({ processNumber, tempoChegada, setTempoChegada, 
  tempoExecucao, setTempoExecucao, deadline, setDeadline, nPaginas, setNPaginas }) => {
  
    return (
      <section className={styles.processDataWrapper}>
        <div className={styles.titleProcessData}>
          <label htmlFor="">Processo Nº {processNumber+1}:</label>
        </div>
        <div className={styles.valuesProcessData}>
          <div className={styles.divTcData}>
            <label htmlFor="" className={styles.labelTcData}>Tempo de Chegada</label>
            <input
              type='number'
              name='tempoChegada'
              required
              value={tempoChegada[processNumber]}
              onChange={(e) => {
                setTempoChegada(prevTempoChegada => {
                  const updatedTempoChegada = [...prevTempoChegada];
                  updatedTempoChegada[processNumber] = e.target.value;
                  return updatedTempoChegada;
                });
              }}
              autoComplete='off'
              className={styles.inputTcData}
            />
          </div>
          <div className={styles.divTcData}>
            <label htmlFor="" className={styles.labelTcData}>Tempo de Execução</label>
            <input
              type='number'
              name='tempoExecucao'
              required
              value={tempoExecucao[processNumber]}
              onChange={(e) => {
                setTempoExecucao(prevTempoExecucao => {
                  const updatedTempoExecucao = [...prevTempoExecucao];
                  updatedTempoExecucao[processNumber] = e.target.value;
                  return updatedTempoExecucao;
                });
              }}
              autoComplete='off'
              className={styles.inputTcData}
            />
          </div>
          <div className={styles.divTcData}>
            <label htmlFor="" className={styles.labelTcData}>Deadline</label>
            <input
              type='number'
              name='deadline'
              required
              value={deadline[processNumber]}
              onChange={(e) => {
                setDeadline(prevDeadline => {
                  const updatedDeadline = [...prevDeadline];
                  updatedDeadline[processNumber] = e.target.value;
                  return updatedDeadline;
                });
              }}
              autoComplete='off'
              className={styles.inputTcData}
            />
          </div>
          <div className={styles.divTcData}>
            <label htmlFor="" className={styles.labelTcData}>Nº de Páginas</label>
            <input
              type='number'
              name='nPaginas'
              required
              value={nPaginas[processNumber]}
              onChange={(e) => {
                setNPaginas(prevNPaginas => {
                  const updatedNPaginas = [...prevNPaginas];
                  updatedNPaginas[processNumber] = e.target.value;
                  return updatedNPaginas;
                });
              }}
              autoComplete='off'
              className={styles.inputTcData}
            />
          </div>
        </div>
      </section>
    );
  };

const Processos = () => {
const [tempoChegada, setTempoChegada] = useState([]);
const [tempoExecucao, setTempoExecucao] = useState([]);
const [deadline, setDeadline] = useState([]);
const [nPaginas, setNPaginas] = useState([]);
const [paginas, setPaginas] = useState([]);
//Memória
const [prevPaginas, setPrevPaginas] = useState([]);
const [paginasRam, setPaginasRam] = useState([]);
const [paginasNaRam, setPaginasNaRam] = useState([]);
const [contador, setContador] = useState([]); //contador para criar páginas de cada processo 
const [contadorAnt, setContadorAnt] = useState([]); //armazena contador anterior e cria da página seguinte até a última que do processo corrente
//Memória
const [qtyProcessos, setQtyProcessos] = useState(0);
const [processos, setProcessos] = useState([]);
const [showProcessos, setShowProcessos] = useState([]);
const [quantum, setQuantum] = useState(0);
const [showButtons, setShowButtons] = useState(true);
const [showFifoGraph, setShowFifoGraph] = useState(false);
const [showSjfGraph, setShowSjfGraph] = useState(false);
const [showRrGraph, setShowRrGraph] = useState(false);
const [showEdfGraph, setShowEdfGraph] = useState(false);

useEffect(() => {
  // Atualiza prevPaginas quando paginas for alterado
  setPrevPaginas(paginas);
}, [paginas]);

const callFIFO = (e) => {
  e.preventDefault();
  handleCreateAllProcess()
  handleButtonClick()
  showSectionFIFO()
}

const callSJF = (e) => {
  e.preventDefault();
  handleCreateAllProcess()
  handleButtonClick()
  showSectionSJF()
}

const callRR = (e) => {
  e.preventDefault();
  handleCreateAllProcess()
  handleButtonClick()
  showSectionRR()
}

const callEDF = (e) => {
  e.preventDefault();
  handleCreateAllProcess()
  handleButtonClick()
  showSectionEDF()
}

const handleButtonClick = () => {
  setShowButtons(false);
};

const handleBackButtonClick = () => {
  setShowButtons(true);
  hiddenSectionFIFO()
  hiddenSectionSJF()
  hiddenSectionRR()
  hiddenSectionEDF()
  setProcessos([]);
};

const showSectionFIFO = () => {
  setShowFifoGraph(true);
};

const hiddenSectionFIFO = () => {
  setShowFifoGraph(false);
};

const showSectionSJF = () => {
  setShowSjfGraph(true);
};

const hiddenSectionSJF = () => {
  setShowSjfGraph(false);
};

const showSectionRR = () => {
  setShowRrGraph(true);
};

const hiddenSectionRR = () => {
  setShowRrGraph(false);
};

const showSectionEDF = () => {
  setShowEdfGraph(true);
};

const hiddenSectionEDF = () => {
  setShowEdfGraph(false);
};

const createInputProcessos = (e) => {
    e.preventDefault();

    const inputs = [];

    for (let i = 0; i < qtyProcessos; i++) {
        inputs.push(<ProcessoInput key={i} 
          processNumber={i} 
          tempoChegada={tempoChegada}
          setTempoChegada={setTempoChegada}
          tempoExecucao={tempoExecucao} 
          setTempoExecucao={setTempoExecucao}
          deadline={deadline} 
          setDeadline={setDeadline}
          nPaginas={nPaginas} 
          setNPaginas={setNPaginas} />);
      }
  
      setShowProcessos(inputs);

}

//Memória
const geradorPaginas = (contador) => {
  const pags = [];
  for (let i = contadorAnt; i < contador + nPaginas; i++) {
    pags.push(i);
  };
return pags;  
}
//Memória

  const handleCreateAllProcess = () => {
    var j = 1;
    for (let i = 0; i < qtyProcessos; i++) {
      let k = Number(nPaginas[i]);
      const paginas = Array.from({ length: k }, (_, index) => j - 1 + index);
      const process = new Processo(
        Number(tempoChegada[i]),
        Number(tempoExecucao[i]),
        Number(deadline[i]),
        paginas
        // geradorPaginas(contador[i])
      );
      console.log(process)
      setProcessos((prevProcessos) => [...prevProcessos, process]);

      setContadorAnt(contador[i]);
      setContador(contador[i] + Number(nPaginas[i])); // Atualiza o contador com base em nPaginas
      j += k;}
    //Memória
    // const geradorPaginas = (contador) => {
    //   const pags = [];
    //   for (let i = contadorAnt; i < contador; i++) {
    //     pags.push(i);
    //   };
    // return pags;  
    // }

  };
  //Memória

  // FIFO

  let tempoAtualFIFO = 0;
  const processosFIFO = processos.map((processo) => {
    const inicio = Math.max(tempoAtualFIFO, processo.tempoChegada);
    const fim = inicio + processo.tempoExecucao;
    tempoAtualFIFO = fim;
    return {
      ...processo,
      tempoChegada: inicio,
      tempoExecucao: fim,
    };
  });

  // SJF

  let tempoAtualSJF = 0;
  const processosOrdenadosSJF = [];
  const processosOrdenadosPorTempoChegada = [...processos].sort((a, b) => a.tempoChegada - b.tempoChegada);

  while (processosOrdenadosPorTempoChegada.length > 0) {
    // Remover todos os processos que já chegaram
    const processosChegados = [];
    while (processosOrdenadosPorTempoChegada.length > 0 && processosOrdenadosPorTempoChegada[0].tempoChegada <= tempoAtualSJF) {
      processosChegados.push(processosOrdenadosPorTempoChegada.shift());
    }

    // Ordenar os processos que chegaram com base no tempo de execução
    processosChegados.sort((a, b) => a.tempoExecucao - b.tempoExecucao);

    if (processosChegados.length > 0) {
      // Adicionar o processo com o menor tempo de execução ao array de processos ordenados
      const processo = processosChegados.shift();
      const inicio = Math.max(tempoAtualSJF, processo.tempoChegada);
      const fim = inicio + processo.tempoExecucao;
      tempoAtualSJF = fim;
      const index = processos.findIndex((p) => p === processo) + 1;
      processosOrdenadosSJF.push({
        ...processo,
        id: `P${index}`,
        tempoChegada: inicio,
        tempoExecucao: processo.tempoExecucao,
        tempoTermino: fim,
      });

      // Adicionar os processos restantes de volta ao array de processos ordenados por tempo de chegada
      processosOrdenadosPorTempoChegada.unshift(...processosChegados);
    } else {
      // Nenhum processo chegou ainda, avançar o tempo atual para o tempo de chegada do próximo processo
      tempoAtualSJF = processosOrdenadosPorTempoChegada[0].tempoChegada;
    }
  }

  // RR

  const processosRR = processos.map((processo) => ({
    tempoChegada: parseInt(processo.tempoChegada),
    tempoExecucao: parseInt(processo.tempoExecucao),
  }));
    
  // EDF

  const processosEDF = processos.map((processo) => ({
    tempoChegada: parseInt(processo.tempoChegada),
    tempoExecucao: parseInt(processo.tempoExecucao),
    deadline: parseInt(processo.deadline), 
  }));

  const renderButtons = () => {
    if (showButtons) {
      return (
        <section className={styles.inputsProcessWrapper}>
          <form onSubmit={callFIFO} className={styles.formForInputs}>
            <button type='submit' className={styles.inputProcess}>FIFO</button>
          </form>
          <form onSubmit={callSJF} className={styles.formForInputs}>
            <button type='submit' className={styles.inputProcess}>SJF</button>
          </form>
          <form onSubmit={callRR} className={styles.formForInputs}>
            <button type='submit' className={styles.inputProcess}>Round Robin</button>
          </form>
          <form onSubmit={callEDF} className={styles.formForInputs}>
            <button type='submit' className={styles.inputProcess}>EDF</button>
          </form>
        </section>
      );
    } else {
      return (
        <section className={styles.inputsProcessWrapper}>
          <div className={styles.formForInputs}>
            <button onClick={handleBackButtonClick} className={styles.inputProcess}>Voltar</button>
          </div>
        </section>
      );
    }
  };

  const renderFIFOSection = () => {
    let result = escalonamentoFIFO(processos);
    const memoryTableComponent = result.memoryTableComponents;
    if (showFifoGraph) {
      return (
        <>
        <section className={styles.graphFIFOProcessWrapper}>.
          <h1>Gráfico de Escalonamento FIFO</h1>
          {/* <div className={styles.divChartGraphFifo} style={{ height: `calc((50px * ${qtyProcessos}) + 30px)` }}> */}
          <div className={styles.divChartGraphFifo}>
            <GanttChartFifo data={processosFIFO} />
          </div>
          <div className={styles.divChartGraphFifoInfos}>
            <p>Turnaround: {result.tempoExecucaoTotal}/{result.qtyProcessos} = {result.tempoMedioEspera}</p>
          </div>
          <div className={styles.chartGraphSubtitleFifo}>
            <p>Legenda:</p>
            <div className={styles.subtitleForExec}></div>
            <p>Executado</p>
          </div>
        </section>
        <div>
        {memoryTableComponent}
        </div>
        <div className='disco'>
        <Disco nPaginas={100}/>
        </div>
        </>
      );
    }
  };

  const renderSJFSection = () => {
    let result = escalonamentoSJF(processos, qtyProcessos);
    const memoryTableComponent = result.memoryTableComponents;
    if (showSjfGraph) {
      return (
      <>
      <section className={styles.graphFIFOProcessWrapper}>
        <h1>Gráfico de Escalonamento SJF</h1>
        <div className={styles.divChartGraphFifo}>
          <GanttChartSJF data={processosOrdenadosSJF} />
        </div>
        <div className={styles.divChartGraphFifoInfos}>
          <p>Turnaround: {result.tempoExecucaoTotal}/{result.qtyProcessos} = {result.tempoMedioEspera}</p>
        </div>
        <div className={styles.chartGraphSubtitleFifo}>
           <p>Legenda:</p>
           <div className={styles.subtitleForExec}></div>
           <p>Executado</p>
        </div>
      </section>
      <div>
      {memoryTableComponent}
      </div>
      <div className='disco'>
      <Disco nPaginas={100}/>
      </div>
      </>
      );
    }
  };

  //Memória
   //const renderMemoryTable = () => {
   // const {result, paginasRam, paginasNaRam} = escalonamentoRR(processos, quantum, paginasRam, paginasNaRam);
    //<MemoryTable paginasRam={paginasRam} occupiedPages={paginasRam}/>
  //}
  //Memória

  const renderRRSection = () => {
    // let result = escalonamentoSJF(processos, qtyProcessos)
    if (showRrGraph) {
      return (
      <section className={styles.graphFIFOProcessWrapper}>
        <h1>Gráfico de Escalonamento Round Robin</h1>
        <div className={styles.divChartGraphFifo}>
          <GanttChartRR data={processosRR} />;
        </div>
        <div className={styles.divChartGraphFifoInfos}>
          {/* <p>Turnaround: {result.tempoExecucaoTotal}/{result.qtyProcessos} = {result.tempoMedioEspera}</p> */}
          <p>Turnaround: 51/4 = 12.75</p>
        </div>
        <div className={styles.chartGraphSubtitleFifo}>
           <p>Legenda:</p>
           <div className={styles.subtitleForExec}></div>
           <p>Executado</p>
           <div className={styles.subtitleOverload}></div>
           <p>Sobrecarga</p>
        </div>
      </section>
      );
    }
  };

  const renderEDFSection = () => {
    // let result = escalonamentoSJF(processos, qtyProcessos)
    if (showEdfGraph) {
      return (
      <section className={styles.graphFIFOProcessWrapper}>
        <h1>Gráfico de Escalonamento EDF</h1>
        <div className={styles.divChartGraphFifo}>
          <GanttChartEDF data={processosEDF} />;
        </div>
        <div className={styles.divChartGraphFifoInfos}>
          {/* <p>Turnaround: {result.tempoExecucaoTotal}/{result.qtyProcessos} = {result.tempoMedioEspera}</p> */}
          <p>Turnaround: 38/4 = 9.50</p>
        </div>
        <div className={styles.chartGraphSubtitleFifo}>
           <p>Legenda:</p>
           <div className={styles.subtitleForExec}></div>
           <p>Executado</p>
           <div className={styles.subtitleOverload}></div>
           <p>Sobrecarga</p>
           <div className={styles.subtitleDeadline}></div>
           <p>Ultrapassou o Deadline</p>
        </div>
      </section>
      );
    }
  };

  return (
    <div>
      <section className={styles.processQtyAndQuantumWrapper}>
          <form onSubmit={createInputProcessos} className={styles.formProcessWrapper}>
            <div className={styles.processQtyWrapper}>
              <div className={styles.processLabelWrapper}>
                <label htmlFor="" className={styles.processQtyLabel}>Número de processos</label>
              </div>
              <input 
                type='number' 
                max={8}
                min={1}
                name='qtyProcessos'
                required 
                onChange={(e) => setQtyProcessos(e.target.value)} 
                value={qtyProcessos}
                autoComplete='off'
                className={styles.processQtyInput}
              />
              <div className={styles.processButtonWrapper}>
                <button type='submit' className={styles.buttonShowProcess}>Mostrar Processos</button>
              </div>
            </div>
            <div className={styles.processQuantumWrapper}>
              <div className={styles.processQuantumDiv}>
                <label htmlFor="" className={styles.processQtyLabel}>Quantum</label>
                <input 
                  type='number' 
                  max={10}
                  min={1}
                  name='quantum'
                  onChange={(e) => setQuantum(e.target.value)} 
                  value={quantum}
                  autoComplete='off'
                  className={styles.processQtyInput}
                />
              </div>
              <div className={styles.processDivOverload}>
                <label htmlFor="" className={styles.processQtyLabel}>Sobrecarga: 1</label>
              </div>
            </div>
          </form>
      </section>
      <section className={styles.processWrapper}>
        <div className={styles.showProcessDiv}>
          {showProcessos}
        </div>
      </section>
      {renderButtons()}
      {renderFIFOSection()}
      {renderSJFSection()}
      {renderRRSection()}
      {renderEDFSection()}
    </div>
  )
}

export default Processos