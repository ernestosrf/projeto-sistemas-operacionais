function escalonamentoEDF(
  processes,
  systemQuantum,
  systemOverload
) {
  // Sort processes by their time of arrival
  processes.sort((a, b) => a.tempoChegada - b.tempoChegada);

  let currentTime = 0;
  let totalTurnaroundTime = 0;
  let completedProcesses = 0;
  const infinity = 99999;
  while (completedProcesses < processes.length) {
    const ready = processes.filter((element) => element.tempoChegada <= currentTime && !element.completed);
    const process = ready.reduce(function (prev, curr) {
      let result =
        prev.deadline - prev.turnaround < curr.deadline - curr.turnaround
          ? prev
          : curr;
      return result;
    }, infinity);
    if (process === infinity) {
      currentTime++;
      continue
    }

    // Execute the process for either the system quantum or the remaining tempoExecucao, whichever is smaller
    const executionTime = Math.min(
      systemQuantum,
      process.tempoExecucao - process.turnaround
    );
    currentTime += executionTime;
    process.turnaround += executionTime;

    // Check if the process missed its deadline
    if (process.turnaround > process.deadline) {
      console.log(`Process ${process.id} missed the deadline.`);
    }

    // Check if the process has completed
    if (process.turnaround === process.tempoExecucao) {
      process.turnaroundTime = currentTime - process.tempoChegada;
      process.completed = true;
      completedProcesses++;
    } else {
      currentTime += systemOverload;
    }
  }

  // Calculate the average turnaround time
  for (const process of processes) {
    if (!isNaN(process.turnaroundTime)) {
      totalTurnaroundTime += process.turnaroundTime;
    }
  }
  const averageTurnaroundTime = totalTurnaroundTime / processes.length;
  return averageTurnaroundTime;
}
const processes = [
  {
    id: 1,
    tempoChegada: 0,
    tempoExecucao: 4,
    deadline: 7,
    completed: false,
    turnaround: 0,
  },
  {
    id: 2,
    tempoChegada: 2,
    tempoExecucao: 2,
    deadline: 5,
    completed: false,
    turnaround: 0,
  },
  {
    id: 3,
    tempoChegada: 4,
    tempoExecucao: 1,
    deadline: 8,
    completed: false,
    turnaround: 0,
  },
  {
    id: 4,
    tempoChegada: 6,
    tempoExecucao: 3,
    deadline: 10,
    completed: false,
    turnaround: 0,
  },
];

const systemQuantum = 2;
const systemOverload = 1;

const averageTurnaroundTime = escalonamentoEDF(
  processes,
  systemQuantum,
  systemOverload
);
console.log('Average Turnaround Time:', averageTurnaroundTime);

module.exports = {escalonamentoEDF};
