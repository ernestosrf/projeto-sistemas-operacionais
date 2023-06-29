import { useState } from 'react'
import styles from "./Processos.module.css";

// funcoes escalonamento
import fifo from '../data/functions/fifo'
import { escalonamentoSJF } from '../data/functions/sjf';
import { escalonamentoRR } from "../data/functions/rr";
import { escalonamentoEDF } from '../data/functions/edf';


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

const callFIFO = (e) => {
    e.preventDefault();
    console.log(fifo.escalonamentoFIFO(processos));
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
                  required 
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
    </div>
  )
}

export default Processos
