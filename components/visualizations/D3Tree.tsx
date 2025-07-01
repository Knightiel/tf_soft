
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { TreeNode } from '../../types';

interface D3TreeProps {
  data: TreeNode;
}

const D3Tree: React.FC<D3TreeProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    const width = 1000;
    const nodeHeight = 50;
    const nodeWidth = 200;

    const root = d3.hierarchy(data);
    const dx = 40;
    const dy = width / (root.height + 1);
    const tree = d3.tree<TreeNode>().nodeSize([dx, dy]);
    tree(root);
    
    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
      if (d.x > x1) x1 = d.x;
      if (d.x < x0) x0 = d.x;
    });

    const height = x1 - x0 + dx * 2;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-dy / 2, x0 - dx, width, height])
      .style('background-color', '#1f2937') // bg-gray-800
      .style('border-radius', '8px');
      
    svg.selectAll("*").remove(); // Clear previous render

    const g = svg.append('g');

    // Links
    g.append('g')
      .attr('fill', 'none')
      .attr('stroke', '#4b5563') // gray-600
      .attr('stroke-opacity', 0.8)
      .attr('stroke-width', 1.5)
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr('d', d3.linkHorizontal<d3.HierarchyPointLink<TreeNode>, d3.HierarchyPointNode<TreeNode>>()
        .x(d => d.y)
        .y(d => d.x));

    // Nodes
    const node = g.append('g')
      .selectAll('g')
      .data(root.descendants())
      .join('g')
      .attr('transform', d => `translate(${d.y},${d.x})`);
      
    const getNodeColor = (type?: string) => {
        switch (type) {
            case 'ude': return '#ef4444'; // red-500
            case 'injection': return '#22c55e'; // green-500
            default: return '#6366f1'; // indigo-500
        }
    }

    node.append('circle')
      .attr('fill', d => getNodeColor(d.data.type))
      .attr('r', 6);

    node.append('text')
      .attr('dx', d => d.children ? -12 : 12)
      .attr('dy', '0.31em')
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .text(d => d.data.name)
      .style('fill', '#f3f4f6') // gray-100
      .style('font-size', '14px')
      .style('font-family', 'sans-serif');

  }, [data]);

  return (
    <div className="w-full overflow-x-auto p-4 bg-gray-800 rounded-lg">
        <svg ref={svgRef}></svg>
    </div>
  );
};

export default D3Tree;
