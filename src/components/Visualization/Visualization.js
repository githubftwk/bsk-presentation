import React, { Component } from 'react';
import './Visualization.css';
import withViewport from '../../decorators/withViewport';
import * as d3 from 'd3';


const SvgComponent = (props) => {
  const { viewport } = props;
  const { paths, data1, data2, data3 } = props
  const pathsComponent = (path, data) => {
    return(
      <path
        stroke={path}
        style={{ mixBlendMode: 'darken' }}
        d={data}
      />
    );
  }
  let { width, height } = viewport;
  width /= 2;
  height /= 2;
  return(
    <svg
      style={{ width: width, height: height }}
      >
      <g
        fill="none"
        strokeWidth={10}
        strokeLinejoin="round"
        transform={"translate(" + width / 2 + "," + height / 2 + ")"}
       >
         {pathsComponent(paths[0], data1)}
         {pathsComponent(paths[1], data2)}
         {pathsComponent(paths[2], data3)}
       </g>
    </svg>
  );
};

const NodeComponent = (props) => {
  const { node } = props;
  return(
    <g>
      <circle
        className="node"
        fill="none"
        stroke="black"
        r={50}
        cx={node.x}
        cy={node.y}
        >
        </circle>
        <text x={node.x - 40} y={node.y} fill="red">I love SVG!</text>
      </g>
  );
};
const EdgeComponent = (props) => {
  const { edge } = props;
  return (
    <line
      className="link"
      stroke="blue"
      x1={edge.source.x}
      x2={edge.target.x}
      y1={edge.source.y}
      y2={edge.target.y}
      />
  );
};
const GraphCompoment = (props) => {
  const { viewport, graph }  = props;
  return (
    <svg width={viewport.width} height={viewport.height}>
      <g>
        {
          graph.links.map((edge, index) => {
            return(
              <EdgeComponent edge={edge} key={index}/>
            );
          })
        }
      </g>
      <g>
        {
          graph.nodes.map((node, index) => {
            return(
              <NodeComponent node={node}/>
            );
          })
        }
      </g>
    </svg>
  );
}

class Visulaiztion extends Component{
  constructor(args){
    super(...args);
    this.state = {
      graph: {
        nodes: [],
        links: [],
      },
    };
  }
  componentDidMount = () => {
    const nodes = [
      { x: this.props.viewport.width / 3, y: this.props.viewport.height / 2 },
      { x: 2 * this.props.viewport.width / 3, y: this.props.viewport.height / 2 }
    ];
    const links = [
      { source: 0, target: 1 },
    ];
    const simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.index }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(this.props.viewport.width / 2, this.props.viewport.width / 2))
      .force("y", d3.forceY(0))
      .force("x", d3.forceX(0));
    // const ticked = () => {
    //   simulation
    //           .force("link", d3.forceLink().id(function(d) { return d.index }))
    //           .force("charge", d3.forceManyBody())
    //           .force("center", d3.forceCenter(this.props.viewport.width / 2, this.props.viewport.width / 2))
    //           .force("y", d3.forceY(0))
    //           .force("x", d3.forceX(0));
    //  simulation.nodes(data.nodes);
    //  simulation.force("link").links(data.links);
    //   // for(let i = 0; i < data.links.length; i++) {
    //   //   data.links[i].source.x = data.links[i].source.x;
    //   //   data.links[i].source.y = data.links[i].source.y;
    //   //   data.links[i].target.x = data.links[i].target.x;
    //   //   data.links[i].target.y = data.links[i].target.y;
    //   // }
    //   //
    //   // for (let i = 0; i < data.nodes.length; i++) {
    //   //   data.nodes[i].x = data.nodes[i].x;
    //   //   data.nodes[i].y = data.nodes[i].y;
    //   // }
    // };
    simulation
         .nodes(nodes);
     simulation.force("link")
         .links(links);
// console.log(nodes, links);
    this.setState({
      graph: {
        nodes: nodes,
        links: links,
      },
    });
  }
  componentWillUpdate = (nextProps) => {
    if(this.props !== nextProps) {
      const { graph } = this.state;
      const { nodes, links } = graph;
      const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.index }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(nextProps.viewport.width / 2, nextProps.viewport.width / 2))
        .force("y", d3.forceY(0))
        .force("x", d3.forceX(0));
      simulation
         .nodes(nodes);
      simulation.force("link")
         .links(links);

      this.setState({
        graph: {
          nodes: nodes,
          links: links,
        },
      });
    }

  }
  render() {
    const { viewport }  = this.props;
    const { graph }  = this.state;
    return(
      <div className="visulaiztionRoot">
        <GraphCompoment viewport={viewport} graph={graph}/>
      </div>
    );
  }
}
export default withViewport(
  Visulaiztion
);
