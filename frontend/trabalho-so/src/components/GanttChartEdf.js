// Parse data
//       const parsedData = data.map((processo) => ({
//         id: processo.id,
//         name: processo.id,
//         resource: processo.id,
//         startDate: new Date(processo.tempoChegada * 1000),
//         endDate: new Date((processo.tempoChegada + processo.tempoExecucao) * 1000),
//       }));

// Rendering with delay

// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';

// const GanttChartEDF = ({ data }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (chartRef.current && data) {
//       const chartContainer = d3.select(chartRef.current);

//       // Set up chart dimensions
//       const margin = { top: 20, right: 30, bottom: 30, left: 50 };
//       const width = chartContainer.node().getBoundingClientRect().width - margin.left - margin.right;
//       const height = 400 - margin.top - margin.bottom;

//       // Create scales
//       const xScale = d3.scaleTime().range([0, width]);
//       const yScale = d3.scaleBand().range([height, 0]);

//       // Create axes
//       const xAxis = d3.axisBottom(xScale);
//       const yAxis = d3.axisLeft(yScale);

//       // Parse data
    // const parsedData = [
    //     { id: 'p1', name: 'p1', startDate: new Date(0), endDate: new Date(2), color: 'blue' },
    //     { id: 'p1', name: 'S', startDate: new Date(2), endDate: new Date(3), color: 'red' },
    //     { id: 'p1', name: 'p1', startDate: new Date(3), endDate: new Date(5), color: 'blue' },  
    //     { id: 'p3', name: 'p3', startDate: new Date(5), endDate: new Date(7), color: 'red' },
    //     { id: 'p2', name: 'p2', startDate: new Date(7), endDate: new Date(9), color: 'blue' },
    //     { id: 'p2', name: 'S', startDate: new Date(9), endDate: new Date(10), color: 'red' },
    //     { id: 'p2', name: 'p2', startDate: new Date(10), endDate: new Date(12), color: 'blue' },
    //     { id: 'p2', name: 'S', startDate: new Date(12), endDate: new Date(13), color: 'red' },
    //     { id: 'p2', name: 'p2', startDate: new Date(13), endDate: new Date(15), color: 'blue' },
    //     { id: 'p2', name: 'S', startDate: new Date(15), endDate: new Date(16), color: 'red' },
    //     { id: 'p2', name: 'p2', startDate: new Date(16), endDate: new Date(17), color: 'blue' },
    //     { id: 'p4', name: 'p4', startDate: new Date(17), endDate: new Date(19), color: 'blue' },
    //     { id: 'p4', name: 'S', startDate: new Date(19), endDate: new Date(20), color: 'red' },
    //     { id: 'p4', name: 'p4', startDate: new Date(20), endDate: new Date(21), color: 'blue' },
    // ];

//       // Sort data by arrival time in ascending order
//       parsedData.sort((a, b) => a.startDate - b.startDate);

//       // Set domains
//       const startTime = d3.min(parsedData, (d) => d.startDate);
//       const endTime = d3.max(parsedData, (d) => d.endDate);
//       xScale.domain([startTime, endTime]);
//       yScale.domain(parsedData.map((d) => d.id)).padding(0.1);
        // yScale.domain(['p1', 'p2', 'p3', 'p4']).padding(0.1);

//       // Create chart
//       const svg = chartContainer
//         .append('svg')
//         .attr('width', width + margin.left + margin.right)
//         .attr('height', height + margin.top + margin.bottom)
//         .append('g')
//         .attr('transform', `translate(${margin.left},${margin.top})`);

//       // Add x-axis
//       svg
//         .append('g')
//         .attr('class', 'x-axis')
//         .attr('transform', `translate(0,${height})`)
//         .call(xAxis);

//       // Add y-axis
//       svg.append('g').attr('class', 'y-axis').call(yAxis);

//       // Function to render processes sequentially
//       const renderProcessesSequentially = (index, previousEndTime = startTime) => {
//         if (index >= parsedData.length) {
//           return; // Finished rendering all processes
//         }

//         const processData = parsedData[index];

//         const bar = svg
//           .append('rect')
//           .attr('class', 'bar')
//           .attr('x', xScale(previousEndTime))
//           .attr('y', yScale(processData.id))
//           .attr('width', 0)
//           .attr('height', yScale.bandwidth())
//           .style('fill', processData.name === 'S' ? '#FF0000' : '#0000FF');

//         const width = xScale(processData.endDate) - xScale(processData.startDate);
//         const duration = (processData.endDate - processData.startDate) / 1000;
//         let currentWidth = 0;
//         let startTime = null;

//         d3.interval(function (elapsed) {
//           if (!startTime) {
//             startTime = elapsed; // Store the start time
//           }

//           const elapsedSeconds = (elapsed - startTime) / 1000; // Elapsed time in seconds
//           const t = elapsedSeconds / duration; // Progress of animation from 0 to 1

//           if (t >= 1) {
//             // Animation completed
//             bar.attr('width', width);
//             renderProcessesSequentially(index + 1, processData.endDate);
//             return true;
//           }

//           currentWidth = t * width;
//           bar.attr('width', currentWidth);
//         }, 1000); // Interval of 1000ms (1 second)
//       };

//       // Start rendering processes sequentially
//       renderProcessesSequentially(0);

//       // Cleanup function
//       return () => {
//         chartContainer.selectAll('svg').remove();
//       };
//     }
//   }, [chartRef, data]);

//   return <div ref={chartRef} />;
// };

// export default GanttChartEDF;

// Rendering instantly

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const GanttChartEDF = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const chartContainer = d3.select(chartRef.current);

      // Set up chart dimensions
      const margin = { top: 20, right: 30, bottom: 30, left: 50 };
      const width = chartContainer.node().getBoundingClientRect().width - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Create scales
      const xScale = d3.scaleTime().range([0, width]);
      const yScale = d3.scaleBand().range([height, 0]);

      // Create axes
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      // Set domains
      const parsedData = [
        { id: 'p1', name: 'p1', startDate: new Date(0), endDate: new Date(2), color: 'blue' },
        { id: 'p1', name: 'S', startDate: new Date(2), endDate: new Date(3), color: 'red' },
        { id: 'p1', name: 'p1', startDate: new Date(3), endDate: new Date(5), color: 'blue' },  
        { id: 'p3', name: 'p3', startDate: new Date(5), endDate: new Date(7), color: 'red' },
        { id: 'p2', name: 'p2', startDate: new Date(7), endDate: new Date(9), color: 'blue' },
        { id: 'p2', name: 'S', startDate: new Date(9), endDate: new Date(10), color: 'red' },
        { id: 'p2', name: 'p2', startDate: new Date(10), endDate: new Date(12), color: 'blue' },
        { id: 'p2', name: 'S', startDate: new Date(12), endDate: new Date(13), color: 'red' },
        { id: 'p2', name: 'p2', startDate: new Date(13), endDate: new Date(15), color: 'blue' },
        { id: 'p2', name: 'S', startDate: new Date(15), endDate: new Date(16), color: 'red' },
        { id: 'p2', name: 'p2', startDate: new Date(16), endDate: new Date(17), color: 'blue' },
        { id: 'p4', name: 'p4', startDate: new Date(17), endDate: new Date(19), color: 'blue' },
        { id: 'p4', name: 'S', startDate: new Date(19), endDate: new Date(20), color: 'red' },
        { id: 'p4', name: 'p4', startDate: new Date(20), endDate: new Date(21), color: 'blue' },
      ];

      const startTime = d3.min(parsedData, (d) => d.startDate);
      const endTime = d3.max(parsedData, (d) => d.endDate);
      xScale.domain([startTime, endTime]);
      //yScale.domain(parsedData.map((d) => d.id)).padding(0.1);
      yScale.domain(['p1', 'p2', 'p3', 'p4']).padding(0.1);

      // Create chart
      const svg = chartContainer
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Add x-axis
      svg
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

      // Add y-axis
      svg.append('g').attr('class', 'y-axis').call(yAxis);

      // Render processes
      const bars = svg
        .selectAll('.bar')
        .data(parsedData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => xScale(d.startDate))
        .attr('y', (d) => yScale(d.id))
        .attr('width', (d) => xScale(d.endDate) - xScale(d.startDate))
        .attr('height', yScale.bandwidth())
        .style('fill', (d) => (d.name === 'S' ? '#FF0000' : '#0000FF'));

      // Cleanup function
      return () => {
        chartContainer.selectAll('svg').remove();
      };
    }
  }, [chartRef, data]);

  return <div ref={chartRef} />;
};

export default GanttChartEDF;