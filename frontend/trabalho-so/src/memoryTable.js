import React from 'react';
import './memoryTable.css';

//const tamRam = 50;
const nColunas = 10;

//Separa o vetor em subvetores, para criar a matriz e exibir n colunas em cada linha
function table(array, tamanho) {
  const arraySeparado = [];
  for (let i = 0; i < array.length; i += tamanho) {
    const linha = array.slice(i, i + tamanho);
    arraySeparado.push(linha);
  }
  return arraySeparado;
}

function MemoryTable({occupiedPages, paginasRam }) {

  const tabela = table(paginasRam, nColunas);

  return (
    <div className="RAM">
      <div className="container">
        <table>
          <thead>
            <tr>
              <th colSpan={nColunas}>
                <h2>Memória RAM</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            {tabela.map((linha, posLinha) => (
              <tr key={posLinha}> {/*Gera linhas dentro da table*/}
                {linha.map((_, posColuna) => {
                  const index = posLinha * nColunas + posColuna; {/*posição geral da célula (array normal, sem ser na matriz)*/}
                  const page = index + 1; {/*Soma 1 por que precisa começar em 1 na parte visual*/}
                  const isOccupied = occupiedPages(index) != null; {/*Vê se a página da Ram está ocupada */}

                  //Cria a célula de memória e se estiver ocupada, seta para vermelho sua cor
                  return (
                    <td
                      key={index} 
                      className={isOccupied ? 'occupied' : ''} 
                       //onClick={() => togglePage(index)}
                    >
                      <span className="cell-index">{page}</span> 
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MemoryTable;
