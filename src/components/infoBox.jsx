import React, { Component } from 'react';
import '../App.css';
import icons from "./componentResources/stats-sprite.png"
var image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAWBAMAAACrl3iAAAAABlBMVEUAAAD+AciWmZzWAAAAAnRSTlMAApidrBQAAAB5SURBVBjTbVFBEsQwCJIf+P/XdlQgurPpoSUFgiTi/8KswEER2TjryTRCDFcaKcXKehn5f1tutr0Xekl8AnDD5s5N2/qmOR6ngzCLvJWEZ9gzj3WJlIGNbLop1jmpspPtKbsTbawGlR+7wSs4Db4Zl/dUOIKfu+QcHwfcBUJEufgeAAAAAElFTkSuQmCC"

export default class InfoBox extends Component {
  /*
   props: value, text
  */

  render() {

    var iconsLib = {
        Instructables: "-2px -2px",
        views:"-2px -26px",
        Comments: "-2px -50px",
        Lessons: "-2px -73px",
        Joined: "-2px -98px"
    }
    return (
    <div className="info-box">
      <img src={image} style={{width: "20px", height: "20px",background: "url("+ icons +") " + iconsLib[this.props.text]}} /> {this.props.text == "Joined" ? <span><span>{this.props.text}</span> <span>{this.props.value}</span></span> : <span><span>{this.props.value}</span> <span>{this.props.text}</span></span>}
    </div>
    );
  }
}