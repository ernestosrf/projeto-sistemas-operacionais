function escalonamentoEDF(
  processes,
  systemQuantum,
  systemOverload
) {
  // Sort processes by their time of arrival
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  let currentTime = 0;
  let totalTurnaroundTime = 0;
  let completedProcesses = 0;
  const infinity = 99999;
  while (completedProcesses < processes.length) {
    const ready = processes.filter((element) => element.arrivalTime <= currentTime && !element.completed);
    const process = ready.reduce(function (prev, curr) {
      let result =
        prev.deadline - prev.executionTime < curr.deadline - curr.executionTime
          ? prev
          : curr;
      return result;
    }, infinity);
    console.log(`CurrentTIme = ${currentTime}, Process ${JSON.stringify(process)} missed the deadline.`);
    if (process === infinity) {
      currentTime++;
      continue
    }

    // Execute the process for either the system quantum or the remaining runtime, whichever is smaller
    const executionTime = Math.min(
      systemQuantum,
      process.runtime - process.executionTime
    );
    currentTime += executionTime;
    process.executionTime += executionTime;

    // Check if the process missed its deadline
    if (process.executionTime > process.deadline) {
      console.log(`Process ${process.id} missed the deadline.`);
    }

    // Check if the process has completed
    if (process.executionTime === process.runtime) {
      process.turnaroundTime = currentTime - process.arrivalTime;
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
    arrivalTime: 0,
    runtime: 4,
    deadline: 7,
    completed: false,
    executionTime: 0,
  },
  {
    id: 2,
    arrivalTime: 2,
    runtime: 2,
    deadline: 5,
    completed: false,
    executionTime: 0,
  },
  {
    id: 3,
    arrivalTime: 4,
    runtime: 1,
    deadline: 8,
    completed: false,
    executionTime: 0,
  },
  {
    id: 4,
    arrivalTime: 6,
    runtime: 3,
    deadline: 10,
    completed: false,
    executionTime: 0,
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
