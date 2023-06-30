import { Chart } from 'react-google-charts';

const GanttChartSJF = ({ data }) => {
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
    ...data
        .sort((a, b) => a.indexOriginal < b.indexOriginal)
        .map((processo, index) => [
        `P${processo.indexOriginal + 1}`,
        `P${processo.indexOriginal + 1}`,
        `P${processo.indexOriginal + 1}`,
        new Date(processo.tempoChegada * 1000),
        new Date(processo.tempoExecucao * 1000),
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

export default GanttChartSJF;