import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const GanttChartFIFO = ({ data }) => {
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

      // Parse data
      const parsedData = data.map((processo, index) => ({
        id: `P${index + 1}`,
        name: `P${index + 1}`,
        resource: `P${index + 1}`,
        startDate: new Date(processo.tempoChegada * 1000),
        endDate: new Date(processo.tempoExecucao * 1000),
      }));

      // Set domains
      xScale.domain([
        d3.min(parsedData, (d) => d.startDate),
        d3.max(parsedData, (d) => d.endDate),
      ]);
      yScale.domain(parsedData.map((d) => d.id)).padding(0.1);

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

      // Function to render processes sequentially
      const renderProcessesSequentially = (index) => {
        if (index >= parsedData.length) {
          return; // Finished rendering all processes
        }

        const processData = parsedData[index];

        const bar = svg
          .append('rect')
          .attr('class', 'bar')
          .attr('x', xScale(processData.startDate))
          .attr('y', yScale(processData.id))
          .attr('width', 0)
          .attr('height', yScale.bandwidth())
          .style('fill', '#0000FF');

        const width = xScale(processData.endDate) - xScale(processData.startDate);
        const duration = (processData.endDate - processData.startDate) / 1000;
        let currentWidth = 0;
        let startTime = null;

        d3.interval(function (elapsed) {
          if (!startTime) {
            startTime = elapsed; // Store the start time
          }

          const elapsedSeconds = (elapsed - startTime) / 1000; // Elapsed time in seconds
          const t = elapsedSeconds / duration; // Progress of animation from 0 to 1

          if (t >= 1) {
            // Animation completed
            bar.attr('width', width);
            renderProcessesSequentially(index + 1); // Render next process
            return true;
          }

          currentWidth = t * width;
          bar.attr('width', currentWidth);
        }, 1000); // Interval of 1000ms (1 second)
      };

      // Start rendering processes sequentially
      renderProcessesSequentially(0);

      // Cleanup function
      return () => {
        chartContainer.selectAll('svg').remove();
      };
    }
  }, [chartRef, data]);

  return <div ref={chartRef} />;
};

export default GanttChartFIFO;