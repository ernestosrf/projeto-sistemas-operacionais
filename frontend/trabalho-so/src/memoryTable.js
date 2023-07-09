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

function MemoryTable({paginasRam }) {
  const tabela = table(paginasRam.map((_, index) => index), nColunas);

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
                  const page = index;
                  const valor = paginasRam[index].valor;
                  const isOccupied = paginasRam[index].ocupada == false; {/*Vê se a página da Ram está ocupada */}

                  //Cria a célula de memória e se estiver ocupada, seta para vermelho sua cor
                  return (
                    <td
                      key={index} 
                      className={isOccupied ? 'occupied' : 'not-occupied'} 
                    >
                      <span className="cell-index-page">{page}</span> 
                      
                      <span className="cell-index-valor">{valor}</span> 
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
