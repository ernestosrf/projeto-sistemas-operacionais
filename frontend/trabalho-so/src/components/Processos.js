import { useState } from 'react'
import styles from "./Processos.module.css";

// funcoes escalonamento
import fifo from '../data/functions/fifo'
import { escalonamentoSJF } from '../data/functions/sjf';
import { escalonamentoRR } from "../data/functions/rr";
import { escalonamentoEDF } from '../data/functions/edf';

import GanttChartFifo from './GanttChartFifo';
import GanttChartSJF from './GrantChartSjs';


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
const [contador, setContador] = useState([]); //contador para criar páginas de cada processo 
const [contadorAnt, setContadorAnt] = useState([]); //armazena contador anterior e cria da página seguinte até a última que do processo corrente
const [qtyProcessos, setQtyProcessos] = useState(0);
const [processos, setProcessos] = useState([]);
const [showProcessos, setShowProcessos] = useState([]);
const [quantum, setQuantum] = useState(0);
const [showButtons, setShowButtons] = useState(true);

// const [displayFIFO, setDisplayFIFO] = useState('none');

const callFIFO = (e) => {
  e.preventDefault();
  handleCreateAllProcess()
  handleButtonClick()
  // setDisplayFIFO('flex');
}

const callSJF = (e) => {
  e.preventDefault();
  handleCreateAllProcess()
  handleButtonClick()
}

const callRR = (e) => {
  e.preventDefault();
  handleCreateAllProcess()
  handleButtonClick()
}

const callEDF = (e) => {
  e.preventDefault();
  handleCreateAllProcess()
  handleButtonClick()
}

const handleButtonClick = () => {
  setShowButtons(false);
};

const handleBackButtonClick = () => {
  setShowButtons(true);
  setProcessos([]);
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

  const handleCreateAllProcess = () => {
    for (let i = 0; i < qtyProcessos; i++) {
      const process = new fifo.Processo(
        Number(tempoChegada[i]),
        Number(tempoExecucao[i]),
        Number(deadline[i]),
        Number(nPaginas[i]),
        // geradorPaginas(contador[i])
      );
      console.log(process)
      setProcessos((prevProcessos) => [...prevProcessos, process]);

      setContadorAnt(contador[i]);
      setContador(contador[i] + Number(nPaginas[i])); // Atualiza o contador com base em nPaginas
    }

    // const geradorPaginas = (contador) => {
    //   const pags = [];
    //   for (let i = contadorAnt; i < contador; i++) {
    //     pags.push(i);
    //   };
    // return pags;  
    // }

  };

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

  // let tempoAtualSJF = 0;
  // const processosSJF = [...processos].sort((a, b) => a.tempoExecucao - b.tempoExecucao);
  // const processosSJFResult = [];

  // while (processosSJF.length > 0) {
  //   const nextProcessIndex = processosSJF.findIndex(
  //     (processo) => processo.tempoChegada <= tempoAtualSJF
  //   );
  //   let nextProcess;
  //   if (nextProcessIndex !== -1) {
  //     nextProcess = processosSJF.splice(nextProcessIndex, 1)[0];
  //   } else {
  //     nextProcess = processosSJF.shift();
  //   }
  //   const inicio = Math.max(tempoAtualSJF, nextProcess.tempoChegada);
  //   const fim = inicio + nextProcess.tempoExecucao;
  //   tempoAtualSJF = fim;
  //   processosSJFResult.push({
  //     ...nextProcess,
  //     tempoChegada: inicio,
  //     tempoExecucao: fim,
  //   });
  // }

  let tempoAtualSJF = 0;
  const processosSJF = [...processos].map((processo, index) => ({
    ...processo,
    indexOriginal: index,
  }));
  const processosSJFResult = [];

  while (processosSJF.length > 0) {
    const nextProcessIndex = processosSJF.findIndex(
      (processo) => processo.tempoChegada <= tempoAtualSJF
    );
    let nextProcess;
    if (nextProcessIndex !== -1) {
      const availableProcesses = processosSJF.filter(
        (processo) => processo.tempoChegada <= tempoAtualSJF
      );
      nextProcess = availableProcesses.reduce((prev, curr) =>
        prev.tempoExecucao < curr.tempoExecucao ? prev : curr
      );
      processosSJF.splice(
        processosSJF.findIndex((p) => p === nextProcess),
        1
      );
    } else {
      nextProcess = processosSJF.shift();
    }
    const inicio = Math.max(tempoAtualSJF, nextProcess.tempoChegada);
    const fim = inicio + nextProcess.tempoExecucao;
    tempoAtualSJF = fim;
    processosSJFResult.push({
      ...nextProcess,
      tempoChegada: inicio,
      tempoExecucao: fim,
    });
  }

  const sortedData = processosSJFResult.sort((a, b) => a.indexOriginal - b.indexOriginal);

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
        <button onClick={handleBackButtonClick} className={styles.inputProcess}>Voltar</button>
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
      {/* <section className={styles.inputsProcessWrapper}>
        <form onSubmit={callFIFO} className={styles.formForInputs}>
          <button type='submit' className={styles.inputProcess}>FIFO</button>
        </form>
        <form onSubmit={callSJF} className={styles.formForInputs}>
          <button type='submit' className={styles.inputProcess}>SJF</button>
        </form>
        <form onSubmit={callRR} className={styles.formForInputs}>
          <button type='submit' className={styles.inputProcess}>Round Roubin</button>
        </form>
        <form onSubmit={callEDF} className={styles.formForInputs}>
          <button type='submit' className={styles.inputProcess}>EDF</button>
        </form>
      </section> */}

      {/* <section className={styles.graphProcessWrapper} style={{ display: displayFIFO }}> */}
      <section className={styles.graphFIFOProcessWrapper}>.
        <h1>Gráfico de Escalonamento FIFO</h1>
        <div className={styles.divChartGraphFifo} style={{ height: `calc((50px * ${qtyProcessos}) + 30px)` }}>
          <GanttChartFifo data={processosFIFO} />
        </div>
        <div className={styles.divChartGraphFifoInfos}>
          <p>Turnaround: {fifo.escalonamentoFIFO(processos).tempoExecucaoTotal}/{fifo.escalonamentoFIFO(processos).qtyProcessos} = {fifo.escalonamentoFIFO(processos).tempoMedioEspera}</p>
        </div>
        <div className={styles.chartGraphSubtitleFifo}>
           <p>Legenda:</p>
           <div className={styles.subtitleForExec}></div>
           <p>Executado</p>
        </div>
      </section>

      {/* <section className={styles.graphFIFOProcessWrapper}>.
        <h1>Gráfico de Escalonamento SJF</h1>
        <div className={styles.divChartGraphFifo} style={{ height: `calc((50px * ${qtyProcessos}) + 30px)` }}>
          <GanttChartSJF data={processosSJF} />
        </div>
        <div className={styles.divChartGraphFifoInfos}>
          <p>Turnaround: {escalonamentoSJF(processos, qtyProcessos).tempoExecucaoTotal}/{escalonamentoSJF(processos, qtyProcessos).qtyProcessos} = {escalonamentoSJF(processos, qtyProcessos).tempoMedioEspera}</p>
        </div>
        <div className={styles.chartGraphSubtitleFifo}>
           <p>Legenda:</p>
           <div className={styles.subtitleForExec}></div>
           <p>Executado</p>
        </div>
      </section> */}

      {/* <section className={styles.graphFIFOProcessWrapper}>
        <h1>Gráfico de Escalonamento SJF</h1>
        <div className={styles.divChartGraphFifo} style={{ height: `calc((50px * ${qtyProcessos}) + 30px)` }}>
          <GanttChartSJF data={sortedData} />
        </div>
        <div className={styles.divChartGraphFifoInfos}>
          <p>Turnaround: {escalonamentoSJF(processos, qtyProcessos).tempoExecucaoTotal}/{escalonamentoSJF(processos, qtyProcessos).qtyProcessos} = {escalonamentoSJF(processos, qtyProcessos).tempoMedioEspera}</p>
        </div>
        <div className={styles.chartGraphSubtitleFifo}>
           <p>Legenda:</p>
           <div className={styles.subtitleForExec}></div>
           <p>Executado</p>
        </div>
      </section> */}

    </div>
  )
}

export default Processos
