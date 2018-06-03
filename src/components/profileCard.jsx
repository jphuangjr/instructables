import React, { Component } from 'react';
import '../App.css';

export default class ProfileCard extends Component {
  /*
   props: link, img, title, authorProfile, authorHandle, channelLink, channel, hoverState
  */
  render() {
    return (
    <div>
      <div className={this.props.hoverState ? "profile-card" : "profile-card-hidden"} style={{top: this.props.top, left: this.props.left}}>
      </div>
      <div className={this.props.hoverState ? "arrow" : "arrow-hidden"} style={{top: this.props.top +195, left: this.props.left + 25}}></div>
    </div>
    );
  }
}