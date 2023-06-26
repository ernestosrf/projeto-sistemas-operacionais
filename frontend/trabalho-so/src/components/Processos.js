import { useState } from 'react'
import styles from "./Processos.module.css";

// funcoes escalonamento
import fifo from '../data/functions/fifo'
import { escalonamentoSJF } from '../data/functions/sjf';
import { escalonamentoRR } from '../data/functions/rr';
import { escalonamentoEDF } from '../data/functions/edf';


const ProcessoInput = ( {onProcessCreated}) => {
    const [tempoChegada, setTempoChegada] = useState(0);
    const [tempoExecucao, setTempoExecucao] = useState(0);
    const [deadline, setDeadline] = useState(0);

    const handleCreateProcesso = () => {
        const process = new fifo.Processo(
          Number(tempoChegada),
          Number(tempoExecucao),
          Number(deadline)
        );
        onProcessCreated(process);
      };
  
    return (
      <div>
        <input
          type='number'
          name='tempoChegada'
          required
          value={tempoChegada}
          onChange={(e) => setTempoChegada(e.target.value)}
          placeholder='Tempo Chegada'
        />
        <input
          type='number'
          name='tempoExecucao'
          required
          value={tempoExecucao}
          onChange={(e) => setTempoExecucao(e.target.value)}
          placeholder='Tempo Execução'
        />
        <input
          type='number'
          name='deadline'
          required
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder='Deadline'
        />
        <button onClick={handleCreateProcesso}>Create Process</button>
      </div>
    );
  };

const Processos = () => {

const [qtyProcessos, setQtyProcessos] = useState(0);
const [processos, setProcessos] = useState([]);
const [showProcessos, setShowProcessos] = useState([]);

const callFIFO = (e) => {
    e.preventDefault();
    console.log(fifo.escalonamentoFIFO(processos));
    setProcessos([]);
}

const callSJF = (e) => {
  e.preventDefault();
  console.log(escalonamentoSJF(processos));
  setProcessos([]);
}

const callRR = (e) => {
  e.preventDefault();
  console.log(escalonamentoRR(processos, 2));
  setProcessos([]);
}

const callEDF = (e) => {
  e.preventDefault();
  console.log(escalonamentoEDF(processos, 2, 1));
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
      <section className={styles.processWrapper}>
          <form onSubmit={createInputProcessos} className={styles.formProcessWrapper}>
            <div className={styles.processQtyWrapper}>
              <div className={styles.processLabelWrapper}>
                <label htmlFor="" className={styles.processQtyLabel}>Número de processos</label>
              </div>
              <input 
                type='text' 
                max={8}
                min={1}
                name='qtyProcessos'
                required 
                onChange={(e) => setQtyProcessos(e.target.value)} 
                value={qtyProcessos} 
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
                  type='text' 
                  // max={8}
                  // min={1}
                  name='quantum'
                  required 
                  // onChange={(e) => setQtyProcessos(e.target.value)} 
                  // value={qtyProcessos} 
                  className={styles.processQtyInput}
                />
              </div>
              <div className={styles.processDivOverload}>
                <label htmlFor="" className={styles.processQtyLabel}>Sobrecarga: 1</label>
              </div>
            </div>
          </form>
      </section>
      <div>
        {showProcessos}
        <form onSubmit={callFIFO}>
            <button type='submit'>FIFO</button>
        </form>
        <form onSubmit={callSJF}>
            <button type='submit'>SJF</button>
        </form>
        <form onSubmit={callRR}>
            <button type='submit'>Round Robin</button>
        </form>
        <form onSubmit={callEDF}>
            <button type='submit'>EDF</button>
        </form>
      </div>
    </div>
  )
}

export default Processos
