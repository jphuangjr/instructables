import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './componentResources/card.css';
import ProfileCard from "./profileCard";

export default class Card extends Component {
 static propTypes = {
    /**
     * @prop {string} link []
     * The link for the instructable
     */
    link: PropTypes.string,
    /**
     * @prop {string} img []
     * The image link
     */
    img: PropTypes.string,
    /**
     * @prop {string} title []
     * The title for the instructable
     */
    title: PropTypes.string,
    /**
     * @prop {string} member []
     * The authors screenName
     */
    member: PropTypes.string,
    /**
     * @prop {string} channelLink []
     * The link for the instructable channel
     */
    channelLink: PropTypes.string,
    /**
     * @prop {string} channel []
     * The title for the channel
     */
    channel: PropTypes.string,
    /**
     * @prop {object} userData []
     * Data object of the author
     */
    userData: PropTypes.object,
    /**
     * @prop {object} myData []
     * Data object of the user
     */
    myData: PropTypes.object,
    /**
     * @prop {object} getUserData []
     * callback to re request user data to get update subscriptions
     */
    getUserData: PropTypes.object
  };
 constructor(props) {
    super(props);
    this.state = {
      hover: false,
      top: 0,
      left: 0,
      userData: {}
    };
  }

  isFollowing() {
    var scope = this;
    if(scope.props.myData && scope.props.myData.subscriptions) {
      var follower = scope.props.myData.subscriptions.filter(function(v) {
          return v.screenName === scope.state.userData.screenName
      })
      if(follower.length > 0) {
          return true;
      } else {
          return false;
      }
    } else {
        return false;
    }
  }

  followUser() {
    var followingStatus = true;
    if(this.isFollowing.call(this)) {
      var followingStatus = false;
    }
    const id = this.state.userData.id;
    const opts = {following: followingStatus, memberId:id};
    fetch('https://www.instructables.com/json-api/setFollowing', {
        method: 'post',
        body: JSON.stringify(opts)
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        this.props.getUserData();
        this.getUserData.call(this, this.state.userData.screenName);
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
  /*
    Note: I am binding the mouseover event to the document body and calling the hoverOff on each element so that I close it when it hovers 
    over a element with the "cover" className because if I were to hover off the name, it would automatically close when the user tries to
    click on anything in the card popout
   */
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
          <a className="cover-image cover" href={this.props.link}><img className="cover" src={this.props.img} title={this.props.title} alt={this.props.title}/></a>
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