import React, { Component } from 'react';
import ReactDOM from "react-dom";
import '../App.css';
import ProfileCard from "./profileCard";
import Underscore from "underscore";

export default class Card extends Component {
  /*
   props: link, img, title, authorProfile, authorHandle, channelLink, channel
  */
 constructor(props) {
    super(props);
    this.state = {
      hover: false,
      top: 0,
      left: 0,
      userData: {}
    };
  }

  followUser() {
    const id = this.state.userData.id;
    const opts = {following: true, memberId:id};
    fetch('https://www.instructables.com/json-api/setFollowing', {
        method: 'post',
        body: JSON.stringify(opts)
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log('Created Gist:', data);
        this.getUserData.call(this, this.stae.userData.screenName);
    });
  }

  getUserData(user) {
    fetch('http://crossorigin.me/https://www.instructables.com/json-api/showAuthorModel?screenName=' + user,{
      mode: 'cors',
      method: 'GET'
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({userData: result})
      }
    )
  }

  hoverOn(e){
    this.getUserData.call(this, e.target.innerHTML)
    let left;
    let top;
    const boundingClientRect = e.target.getBoundingClientRect();
    const targetTop = boundingClientRect.top;
    const targetLeft = boundingClientRect.left;
    left = targetLeft
    top = targetTop - 293;
    this.setState({ hover: true, left: left, top: top });

  }
  hoverOff(e){
    const scope = this;
    var classes = e.target.className.split(" ");
    if(classes.indexOf("cover") > -1) {
      scope.setState({hover: false});
    }
  }
  componentDidMount() {
    document.body.addEventListener("mouseover", this.hoverOff.bind(this));
  }

  componentWillUnmount() {
    document.body.removeEventListener("mouseover", this.hoverOff.bind(this));
  }
  render() {
    return (
      <li>
        <div className="explore-cover-item cover-item">
          <a className="cover-image cover" href={this.props.link}><img className="cover" src={this.props.img} title={this.props.title}/></a>
          <div className="cover-info cover">
            <span className="title"><a href={this.props.link}>{this.props.title}</a></span><br />
            {<ProfileCard top={this.state.top} left={this.state.left} hoverState={this.state.hover} userData={this.state.userData} myData={this.props.myData} followUser={this.followUser.bind(this)}/>}
            <span className="author" onMouseEnter={this.hoverOn.bind(this)}> by <a href={"https://www.instructables.com/member/" + this.props.member}>{this.props.member}</a></span><span className="channel"> in <a href={this.props.channelLink}>{this.props.channel}</a></span>
          </div>
        </div>
      </li>
    );
  }
}