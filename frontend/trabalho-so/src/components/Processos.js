import { useState } from 'react'
import styles from "./Processos.module.css";

// funcoes escalonamento
import fifo from '../data/functions/fifo'
import { escalonamentoSJF } from '../data/functions/sjf';
import { escalonamentoRR } from "../data/functions/rr";
import { escalonamentoEDF } from '../data/functions/edf';

import GanttChartFifo from './GanttChartFifo';
import GanttChartSJF from './GrantChartSjs';


const ProcessoInput = ({ onProcessCreated }) => {
  const [tempoChegada, setTempoChegada] = useState(0);
  const [tempoExecucao, setTempoExecucao] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [nPaginas, setNPaginas] = useState(0);
  const [contador, setContador] = useState(0); //contador para criar páginas de cada processo 
  const [contadorAnt, setContadorAnt] = useState(0); //armazena contador anterior e cria da página seguinte até a última que do processo corrente

  const handleCreateProcesso = () => {
    const process = new fifo.Processo(
      Number(tempoChegada),
      Number(tempoExecucao),
      Number(deadline),
      Number(nPaginas),
      geradorPaginas(contador)
    );
    onProcessCreated(process);

    setContadorAnt(contador);
    setContador(contador + Number(nPaginas)); // Atualiza o contador com base em nPaginas
  };

  const geradorPaginas = (contador) => {
    const pags = [];
    for (let i = contadorAnt; i < contador; i++) {
    	pags.push(i);
    };
	return pags;  
  }
  
    return (
      <section className={styles.processDataWrapper}>
        <div className={styles.titleProcessData}>
          <label htmlFor="">Processo Nº "X":</label>
        </div>
        <div className={styles.valuesProcessData}>
          <div className={styles.divTcData}>
            <label htmlFor="" className={styles.labelTcData}>Tempo de Chegada</label>
            <input
              type='number'
              name='tempoChegada'
              required
              value={tempoChegada}
              onChange={(e) => setTempoChegada(e.target.value)}
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
              value={tempoExecucao}
              onChange={(e) => setTempoExecucao(e.target.value)}
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
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
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
              value={nPaginas}
              onChange={(e) => setNPaginas(e.target.value)}
              autoComplete='off'
              className={styles.inputTcData}
            />
          </div>
        </div>
        <button onClick={handleCreateProcesso} className={styles.inputHiddenTcData}>Create Process</button>
      </section>
    );
  };

const Processos = () => {

const [qtyProcessos, setQtyProcessos] = useState(0);
const [processos, setProcessos] = useState([]);
const [showProcessos, setShowProcessos] = useState([]);
const [quantum, setQuantum] = useState(0);

// const [displayFIFO, setDisplayFIFO] = useState('none');

const callFIFO = (e) => {
  e.preventDefault();
  console.log(fifo.escalonamentoFIFO(processos));
  // setDisplayFIFO('flex');
  setProcessos([]);
}

const callSJF = (e) => {
  e.preventDefault();
  console.log(escalonamentoSJF(processos, qtyProcessos));
  setProcessos([]);
}

const callRR = (e) => {
  e.preventDefault();
  console.log(escalonamentoRR(processos, quantum));
  setProcessos([]);
}

const callEDF = (e) => {
  e.preventDefault();
  // console.log(escalonamentoEDF(processos, 2, 1));
  setProcessos([]);
}

const handleProcessCreated = (process) => {
    setProcessos((prevProcessos) => [...prevProcessos, process]);
  };

const createInputProcessos = (e) => {
    e.preventDefault();

    const inputs = [];

    for (let i = 0; i < qtyProcessos; i++) {
        inputs.push(<ProcessoInput key={i} onProcessCreated={handleProcessCreated}/>);
      }
  
      setShowProcessos(inputs);

}

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
                max={12}
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
                  // required 
                  // onChange={(e) => setQtyProcessos(e.target.value)} 
                  // value={qtyProcessos}
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
      <section className={styles.inputsProcessWrapper}>
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
      </section>

      {/* <section className={styles.graphProcessWrapper} style={{ display: displayFIFO }}> */}
      {/* <section className={styles.graphFIFOProcessWrapper}>.
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
      </section> */}

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

      <section className={styles.graphFIFOProcessWrapper}>
        <h1>Gráfico de Escalonamento SJF</h1>
        <div className={styles.divChartGraphFifo} style={{ height: `calc((50px * ${qtyProcessos}) + 30px)` }}>
          {/* <GanttChartSJF data={processosSJFResult} /> */}
          <GanttChartSJF data={sortedData} />
        </div>
        {/* <div className={styles.divChartGraphFifoInfos}>
          <p>Turnaround: {escalonamentoSJF(processos, qtyProcessos).tempoExecucaoTotal}/{escalonamentoSJF(processos, qtyProcessos).qtyProcessos} = {escalonamentoSJF(processos, qtyProcessos).tempoMedioEspera}</p>
        </div>
        <div className={styles.chartGraphSubtitleFifo}>
           <p>Legenda:</p>
           <div className={styles.subtitleForExec}></div>
           <p>Executado</p>
        </div> */}
      </section>

    </div>
  )
}

export default Processos
