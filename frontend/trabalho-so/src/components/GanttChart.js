import React from 'react';
import { Chart } from 'react-google-charts';

const GanttChart = ({ data }) => {

  const chartData = [
    [
      { type: 'string', label: 'ID da Tarefa' },
      { type: 'string', label: 'Nome da Tarefa' },
      { type: 'string', label: 'Recurso' },
      { type: 'date', label: 'Data de Início' },
      { type: 'date', label: 'Data de Conclusão' },
      { type: 'number', label: 'Duração' },
      { type: 'number', label: '% Completo' },
      { type: 'string', label: 'Dependências' },
    ],
    ...data.map((processo, index) => [
      `P${index + 1}`,
      `P${index + 1}`,
      `P${index + 1}`,
      new Date(processo.tempoChegada * 1000), // Multiplica por 1000 para obter o timestamp em milissegundos
      new Date(processo.tempoExecucao * 1000), // Multiplica por 1000 para obter o timestamp em milissegundos
      null,
      100,
      null,
    ]),
  ];

  const colors = ['#0000FF'];

  return (
    <Chart
      chartType="Gantt"
      data={chartData}
      width="100%"
      height="100%"
      options={{
        gantt: {
          trackHeight: 50,
          barCornerRadius: 10,
          criticalPathEnabled: false,
          arrow: {
            angle: 100,
            width: 5,
            colors: 'green',
            radius: 0,
          },
          palette: colors.map((color) => ({
            color,
            dark: color,
            light: color,
          })),
        },
      }}
    />
  );
};

export default GanttChart;