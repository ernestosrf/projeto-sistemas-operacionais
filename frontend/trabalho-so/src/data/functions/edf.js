function escalonamentoEDF(
  processes,
  systemQuantum,
  systemOverload
) {
  // Sort processes by their time of arrival
  processes.sort((a, b) => a.tempoChegada - b.tempoChegada);
  processes.forEach((p) => {
		p.feadtime = 0;
	});
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
      process.tempoExecucao - process.feadtime
    );
    process.feadtime += executionTime;
    for (const obj of processes) {
      if (!obj.completed && obj.tempoChegada <= currentTime) {
        obj.turnaround += executionTime;
      }else if(!obj.completed && obj.tempoChegada <= currentTime + executionTime){
        obj.turnaround += currentTime + executionTime - obj.tempoChegada; 
      }
    }
    currentTime += executionTime;

    // Check if the process missed its deadline
    if (process.turnaround > process.deadline) {
      console.log(`Process ${process.id} missed the deadline.`);
    }

    // Check if the process has completed
    if (process.feadtime === process.tempoExecucao) {
      process.turnaroundTime = currentTime - process.tempoChegada;
      process.completed = true;
      completedProcesses++;
    } else {
      for (const obj of processes) {
        if (!obj.completed && obj.tempoChegada <= currentTime) {
          obj.turnaround += systemOverload;
        }else if(!obj.completed && obj.tempoChegada <= currentTime + systemOverload){
          obj.turnaround += currentTime + systemOverload - obj.tempoChegada; 
        }
      }
      currentTime += systemOverload;
    }
  }

  // Calculate the average turnaround time
  for (const process of processes) {
    if (!isNaN(process.turnaroundTime)) {
      totalTurnaroundTime += process.turnaroundTime;
    }
  }
  const qtyProcessos = processes.length;
  const averageTurnaroundTime = totalTurnaroundTime / qtyProcessos;
  return {currentTime, qtyProcessos, averageTurnaroundTime};
}

module.exports = {escalonamentoEDF};
