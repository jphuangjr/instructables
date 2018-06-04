import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './componentResources/infoBox.css';
import icons from "./componentResources/stats-sprite.png"
var image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAWBAMAAACrl3iAAAAABlBMVEUAAAD+AciWmZzWAAAAAnRSTlMAApidrBQAAAB5SURBVBjTbVFBEsQwCJIf+P/XdlQgurPpoSUFgiTi/8KswEER2TjryTRCDFcaKcXKehn5f1tutr0Xekl8AnDD5s5N2/qmOR6ngzCLvJWEZ9gzj3WJlIGNbLop1jmpspPtKbsTbawGlR+7wSs4Db4Zl/dUOIKfu+QcHwfcBUJEufgeAAAAAElFTkSuQmCC"

export default class InfoBox extends Component {
 static propTypes = {
  /**
   * @prop {number} value []
   * The value for the infobox
   */
  value: PropTypes.number,

  /**
   * @prop {string} text []
   * The title for the info box
   */
  text: PropTypes.string
};

  render() {
    var iconsLib = {
        Instructables: "-2px -2px",
        views:"-2px -26px",
        Comments: "-2px -50px",
        Lessons: "-2px -73px",
        Joined: "-2px -98px"
    }
    if(this.props.value === 0 && this.props.text !== "Joined") {
      return <span></span>;
    }
    return (
      <div className="info-box">
        <img className="info-box-image" src={image} style={{background: "url("+ icons +") " + iconsLib[this.props.text]}} alt="?"/> {this.props.text === "Joined" ? <span><span>{this.props.text}</span> <span>{this.props.value}</span></span> : <span><span>{this.props.value}</span> <span>{this.props.text}</span></span>}
      </div>
    );
  }
}