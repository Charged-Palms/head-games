import React, { Component } from "react";
import * as d3 from "d3";
// import { legendColor, legendSize } from "d3-svg-legend";
import { data } from "./D3BubblesData";
import "./D3Bubbles.css";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";
import { withRouter } from "react-router-dom";

class D3Bubbles extends Component {
  state = {
    topicId: null
  };

  componentDidMount() {
    this.bubbles();
  }

  componentDidUpdate() {
    this.bubbles();
  }

  bubbles = () => {
    const svg = d3.select(this.node);
    let width = +svg.attr("width");
    let height = +svg.attr("height");
    // let width = document.body.clientWidth; // get width in pixels
    // let height = document.body.clientHeight; // get width in pixels

    let centerX = width * 0.5;
    let centerY = height * 0.5;
    let strength = 0.1;
    let focusedNode;
    let format = d3.format(",d");
    // let scaleColor = d3.scaleOrdinal(d3.schemeCategory20);

    //Container for the gradients
    var defs = svg.append("defs");

    //Filter for the outside glow
    var filter = defs.append("filter").attr("id", "glow");
    filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "4.0")
      .attr("result", "coloredBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    let scaleColor = d3.scaleOrdinal().range([
      "#e6194b",
      "#f58231",
      "#ffe119",
      "#3cb44b",
      "#42d4f4",
      "#4363d8",
      "#911eb4",
      "#f032e6",
      "#fffac8",
      "#ffd8b1",
      "#aaffc3",
      "#e6beff"
      // "#800000",
      // "#808000",
      // "#469990",
      // "#000075",
      // "#ffa07a",
      // "#f08080",
      // "#b22222",
      // "#898482"
    ]);
    // use pack to calculate radius of the circle
    let pack = d3
      .pack()
      .size([width, height])
      .padding(0.2);
    let forceCollide = d3.forceCollide(d => d.r + 1);
    // use the force
    let simulation = d3
      .forceSimulation()
      // .force('link', d3.forceLink().id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("collide", forceCollide)
      // .force('center', d3.forceCenter(centerX, centerY))
      .force("x", d3.forceX(centerX).strength(strength))
      .force("y", d3.forceY(centerY).strength(strength));

    let root = d3.hierarchy({ children: data }).sum(d => d.value);
    // we use pack() to automatically calculate radius conveniently only
    // and get only the leaves
    let nodes = pack(root)
      .leaves()
      .map(node => {
        const data = node.data;
        return {
          x: centerX + (node.x - centerX) * 3, // magnify start position to have transition to center movement
          y: centerY + (node.y - centerY) * 3,
          r: 0, // for tweening
          // radius: node.r, //original
          radius: 39,
          id: data.cat + "." + data.name.replace(/\s/g, "-"),
          cat: data.cat,
          name: data.name,
          value: data.value,
          icon: data.icon,
          desc: data.desc
        };
      });

    simulation.nodes(nodes).on("tick", ticked);

    let node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(
        d3
          .drag()
          .on("start", d => {
            if (!d3.event.active) simulation.alphaTarget(0.2).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", d => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
          })
          .on("end", d => {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );


    //Color gradients for circles
    var grads = svg
      .append("defs")
      .selectAll("radialGradient")
      .data(nodes)
      .enter()
      .append("radialGradient")
      .attr("gradientUnits", "objectBoundingBox")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", "100%")
      .attr("id", function(d, i) {
        return "grad" + i;
      });

    grads
      .append("stop")
      .attr("offset", "0%")
      .style("stop-color", "white");

    grads
      .append("stop")
      .attr("offset", "100%")
      .style("stop-color", function(d) {
        return scaleColor(d.cat);
      });

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 75)
      .attr("class", "d3-bubbles-title")
      .style("text-anchor", "middle")
      .text("Select Topic for Your Quiz!");

    node
      .append("circle")
      .attr("id", d => d.id)
      .attr("r", 0)
      // .style("fill", d => scaleColor(d.cat))
      .attr("fill", function(d, i) {
        return "url(#grad" + i + ")";
      })
      // .style("border", `200px solid ${d => scaleColor(d.cat)}`)
      .transition()
      .duration(2000)
      .ease(d3.easeElasticOut)
      .tween("circleIn", d => {
        let i = d3.interpolateNumber(0, d.radius);
        return t => {
          d.r = i(t);
          simulation.force("collide", forceCollide);
        };
      });

    node
      .append("clipPath")
      .attr("id", d => `clip-${d.id}`)
      .append("use")
      .attr("xlink:href", d => `#${d.id}`);

    // display text as circle icon
    node
      .filter(d => !String(d.icon).includes("img/"))
      .append("text")
      .classed("node-icon", true)
      .attr("clip-path", d => `url(#clip-${d.id})`)
      .selectAll("tspan")
      // .data(d => d.icon.split(";"))
      .data(d => d.name.split(";"))
      .enter()
      .append("tspan")
      .attr("x", -32)
      .attr("y", (d, i, nodes) => 13 + (i - nodes.length / 2 - 0.5) * 10)
      .text(name => name);

    // display image as circle icon
    // node
    //   .filter(d => String(d.icon).includes("img/"))
    //   .append("image")
    //   .classed("node-icon", true)
    //   .attr("clip-path", d => `url(#clip-${d.id})`)
    //   .attr("xlink:href", d => d.icon)
    //   .attr("x", d => -d.radius * 0.7)
    //   .attr("y", d => -d.radius * 0.7)
    //   .attr("height", d => d.radius * 2 * 0.7)
    //   .attr("width", d => d.radius * 2 * 0.7);
    node
      .append("title")
      .text(d => d.cat + "::" + d.name + "\n" + format(d.value));

    //add border or "glow" to each circle
    d3.selectAll("circle")
      .style("filter", "url(#glow)")
      .style("stroke", "black")
      .style("stroke-width", 4);

    // let legendOrdinal = legendColor()
    //   .scale(scaleColor)
    //   .shape("circle");
    // let legend = svg
    //   .append("g")
    //   .classed("legend-color", true)
    //   .attr("text-anchor", "start")
    //   .attr("transform", "translate(20,30)")
    //   .style("font-size", "12px")
    //   .call(legendOrdinal);
    // let sizeScale = d3
    //   .scaleOrdinal()
    //   .domain(["less use", "more use"])
    //   .range([5, 10]);
    // let legendSizeTwo = legendSize()
    //   .scale(sizeScale)
    //   .shape("circle")
    //   .shapePadding(10)
    //   .labelAlign("end");
    // let legend2 = svg
    //   .append("g")
    //   .classed("legend-size", true)
    //   .attr("text-anchor", "start")
    //   .attr("transform", "translate(150, 25)")
    //   .style("font-size", "12px")
    //   .call(legendSizeTwo);
    /*
            <foreignObject class="circle-overlay" x="10" y="10" width="100" height="150">
                <div class="circle-overlay__inner">
                    <h2 class="circle-overlay__title">ReactJS</h2>
                    <p class="circle-overlay__body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, sunt, aspernatur. Autem repudiandae, laboriosam. Nulla quidem nihil aperiam dolorem repellendus pariatur, quaerat sed eligendi inventore ipsa natus fugiat soluta doloremque!</p>
                </div>
            </foreignObject>
            */
    let infoBox = node
      .append("foreignObject")
      .classed("circle-overlay hidden", true)
      .attr("x", -350 * 0.5 * 0.8)
      .attr("y", -350 * 0.5 * 0.8)
      .attr("height", 350 * 0.8)
      .attr("width", 350 * 0.8)
      .append("xhtml:div")
      .classed("circle-overlay__inner", true);
    infoBox
      .append("h2")
      .classed("circle-overlay__title", true)
      .text(d => d.name);
    infoBox
      .append("p")
      .classed("circle-overlay__body", true)
      .html(d => d.desc);
    //Add button to each circle when selected
    infoBox
      .append("button")
      .attr("name", d => d.name)
      .attr("class", "infoBox-button")
      .on("click", async d => {
        await this.setState({ topicId: d.index + 1 });
        this.register();
        // this.props.history.push("/home")
      });
    //Add button text
    d3.selectAll(".infoBox-button").text("Select Topic!");

    node.on("click", currentNode => {
      d3.event.stopPropagation();
      let currentTarget = d3.event.currentTarget; // the <g> el
      if (currentNode === focusedNode) {
        // no focusedNode or same focused node is clicked
        return;
      }
      let lastNode = focusedNode;
      focusedNode = currentNode;
      simulation.alphaTarget(0.2).restart();
      // hide all circle-overlay
      d3.selectAll(".circle-overlay").classed("hidden", true);
      d3.selectAll(".node-icon").classed("node-icon--faded", false);
      // don't fix last node to center anymore
      if (lastNode) {
        lastNode.fx = null;
        lastNode.fy = null;
        node
          .filter((d, i) => i === lastNode.index)
          .transition()
          .duration(2000)
          .ease(d3.easePolyOut)
          .tween("circleOut", () => {
            let irl = d3.interpolateNumber(lastNode.r, lastNode.radius);
            return t => {
              lastNode.r = irl(t);
            };
          })
          .on("interrupt", () => {
            lastNode.r = lastNode.radius;
          });
      }
      // if (!d3.event.active) simulation.alphaTarget(0.5).restart();
      d3.transition()
        .duration(2000)
        .ease(d3.easePolyOut)
        .tween("moveIn", () => {
          let ix = d3.interpolateNumber(currentNode.x, centerX);
          let iy = d3.interpolateNumber(currentNode.y, centerY);
          let ir = d3.interpolateNumber(currentNode.r, centerY * 0.5);
          return function(t) {
            currentNode.fx = ix(t);
            currentNode.fy = iy(t);
            currentNode.r = ir(t);
            simulation.force("collide", forceCollide);
          };
        })
        .on("end", () => {
          simulation.alphaTarget(0);
          let $currentGroup = d3.select(currentTarget);
          $currentGroup.select(".circle-overlay").classed("hidden", false);
          $currentGroup.select(".node-icon").classed("node-icon--faded", true);
        })
        .on("interrupt", () => {
          currentNode.fx = null;
          currentNode.fy = null;
          simulation.alphaTarget(0);
        });
    });
    // blur
    d3.select(document).on("click", () => {
      let target = d3.event.target;
      // check if click on document but not on the circle overlay
      if (!target.closest("#circle-overlay") && focusedNode) {
        focusedNode.fx = null;
        focusedNode.fy = null;
        simulation.alphaTarget(0.2).restart();
        d3.transition()
          .duration(2000)
          .ease(d3.easePolyOut)
          .tween("moveOut", function() {
            let ir = d3.interpolateNumber(focusedNode.r, focusedNode.radius);
            return function(t) {
              focusedNode.r = ir(t);
              simulation.force("collide", forceCollide);
            };
          })
          .on("end", () => {
            focusedNode = null;
            simulation.alphaTarget(0);
          })
          .on("interrupt", () => {
            simulation.alphaTarget(0);
          });
        // hide all circle-overlay
        d3.selectAll(".circle-overlay").classed("hidden", true);
        d3.selectAll(".node-icon").classed("node-icon--faded", false);
      }
    });
    function ticked() {
      node
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .select("circle")
        .attr("r", d => d.r);
    }
  };

  register = () => {
    const {
      profilePic: profile_pic,
      firstName: first_name,
      lastName: last_name,
      age: user_age,
      email,
      password: hash,
      gender,
      zipcode,
      bio,
      status
    } = this.props;
    const { topicId: topic_id } = this.state;
    try {
      axios.post("/auth/register", {
        profile_pic,
        first_name,
        last_name,
        user_age,
        email,
        hash,
        gender,
        zipcode,
        bio,
        status,
        topic_id
      });
      this.props.setUser({ topicId: topic_id });
      this.props.history.push("/home");
    } catch {
      alert("Register Error");
    }
  };

  render() {
    return (
      <div className="d3-bubble-thing">
        <svg
          id="color-mesh"
          ref={node => (this.node = node)}
          style={{
            animation: "color-change-4x 7s linear infinite alternate both",
            boxShadow: "inset 0px 0px 30px 10px rgba(0, 0, 0, 0.75)"
          }}
          width={this.props.width}
          height={this.props.height}
        ></svg>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const {
    userId,
    profilePic,
    email,
    firstName,
    lastName,
    password,
    gender,
    age,
    zipcode,
    bio,
    status
  } = reduxState;
  return {
    userId,
    profilePic,
    email,
    firstName,
    lastName,
    password,
    gender,
    age,
    zipcode,
    bio,
    status
  };
}

export default connect(
  mapStateToProps,
  { setUser }
)(withRouter(D3Bubbles));
