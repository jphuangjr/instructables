import React, { Component } from 'react';
import ReactDOM from "react-dom";
import '../App.css';
import ProfileCard from "./profileCard";

export default class Card extends Component {
  /*
   props: link, img, title, authorProfile, authorHandle, channelLink, channel
  */
 constructor(props) {
  super(props);
  this.state = {
    hover: false,
    top: 0,
    left: 0
  };
  }
  hoverOn(e){
    let left;
    let top;
    const boundingClientRect = e.target.getBoundingClientRect();
    const targetTop = boundingClientRect.top;
    const targetLeft = boundingClientRect.left;
    const targetWidth = boundingClientRect.width;
    const targetHeight = boundingClientRect.height;
    left = targetLeft
    top = targetTop - 210;
    this.setState({ hover: true, left: left, top: top });
    console.log(e.target.getBoundingClientRect())

  }
  hoverOff(e){ 
    console.log("hoverOff")
    this.setState({ hover: false });    
  }
  render() {
    return (
      <li>
        <div className="explore-cover-item cover-item">
          <a className="cover-image" href={this.props.link}><img src={this.props.img} alt={this.props.title}/></a>
          <div className="cover-info">
            <span className="title"><a href={this.props.link}>{this.props.title}</a></span><br />
            {<ProfileCard top={this.state.top} left={this.state.left} hoverState={this.state.hover}/>}
            <span className="author" onMouseEnter={this.hoverOn.bind(this)} onMouseLeave={this.hoverOff.bind(this)}> by <a href={"https://www.instructables.com/member/" + this.props.member}>{this.props.member}</a></span><span className="channel"> in <a href={this.props.channelLink}>{this.props.channel}</a></span>
          </div>
        </div>
      </li>
    );
  }
}