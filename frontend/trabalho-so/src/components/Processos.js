import { useState } from 'react'
import fifo from '../data/functions/fifo'

const ProcessoInput = ( {onProcessCreated}) => {
    const [tempoChegada, setTempoChegada] = useState(0);
    const [tempoExecucao, setTempoExecucao] = useState(0);

    const handleCreateProcesso = () => {
        const process = new fifo.Processo(
          Number(tempoChegada),
          Number(tempoExecucao),
          0,
          0
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
        <button onClick={handleCreateProcesso}>Create Process</button>
      </div>
    );
  };

const Processos = () => {

const [qtyProcessos, setQtyProcessos] = useState(0);
const [processos, setProcessos] = useState([]);
const [showProcessos, setShowProcessos] = useState([]);

const callFifo = (e) => {
    e.preventDefault();
    console.log(fifo.escalonamentoFIFO(processos));
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
        <div>Processos</div>      
      <form onSubmit={createInputProcessos}>   
      <input 
          type='number' 
          max={8}
          min={1}
          name='qtyProcessos'
          required 
          onChange={(e) => setQtyProcessos(e.target.value)} 
          value={qtyProcessos} 
          />
          <button type='submit'>Mostrar Processos</button>
      </form>
      <div>
        {showProcessos}
        <form onSubmit={callFifo}>
            <button type='submit'>FIFO</button>
        </form>
      </div>
    </div>
  )
}

export default Processos