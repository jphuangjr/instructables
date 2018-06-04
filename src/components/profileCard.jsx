import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './componentResources/profileCard.css';
import InfoBox from "./infoBox";

export default class ProfileCard extends Component {
  static propTypes = {
    /**
     * @prop {number} top []
     * Top for position fixed of card
     */
    top: PropTypes.number,
  
    /**
     * @prop {number} left []
     * Left for position fixed of card
     */
    left: PropTypes.number,
    
    /**
     * @prop {bool} hoverState []
     * State of hover over
     */
    hoverState: PropTypes.bool,
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
     * @prop {func} followUser []
     * Function for invoking ajax to set following of user
     */
    followUser: PropTypes.func
  };

  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
  isFollowing() {
      var scope = this;
      if(scope.props.myData && scope.props.myData.subscriptions) {
        var follower = scope.props.myData.subscriptions.filter(function(v) {
            return v.screenName === scope.props.userData.screenName
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
  render() {
    const user = this.props.userData;
    var data = ["Instructables","views","Comments","Lessons","Joined"];
    var joinedDate = new Date(user.signup);
    var todayDate = new Date();
    var dataMap = {
        Instructables: user.instructablesCount,
        views: user.views,
        Comments: user.commentCount,
        Lessons: user.lessonCount,
        Joined: joinedDate.getFullYear(),
        followId: user.id
    }
    var badge;
    if (user.views + user.featuredCount*250000 > 5000000) {
        badge = "Super"
    } else if(user.views + user.instructablesCount*100000 > 1000000) {
        badge = "Active"
    } else if(this.monthDiff.call(this, joinedDate, todayDate) <=4) {
        badge = "New";
    } else {
        badge = null;
    }
    return (
    <div>
      <div className={this.props.hoverState ? "profile-card" : "profile-card-hidden"} style={{top: this.props.top, left: this.props.left}}>
        {this.props.userData.id &&
            <div className="card-body">
                <div className="card-top-section">
                    <div className="card-profile-image">
                        <img alt={user.screenName} src={user.square3Url} style={{width: "70px", height:"70px", borderRadius: "50%"}}/>
                    </div>
                    <div className="card-user-section">
                        <div className="card-username">
                            <b>{user.screenName}</b> {badge && <span class="label label-default">{badge}</span>}
                        </div>
                        <div>
                            <button onClick={this.props.followUser} className="btn btn-yellow">{this.isFollowing.call(this) ?  "✓ Following" : "Follow"}</button> <span className="card-follower-count">{user.followersCount}</span>
                        </div>
                    </div>
                </div>
                <div>
                    {data.map(function(v){
                        return <div key={v}><InfoBox text={v} value={dataMap[v]}/></div>
                    })}
                </div>
            </div>
        }
      </div>
      <div className={this.props.hoverState ? "arrow" : "arrow-hidden"} style={{top: this.props.top +276, left: this.props.left + 25}}></div>
      {this.props.hoverState && <div className={"profile-guard-box"} style={{top: this.props.top +276, left: this.props.left}}></div>}
    </div>
    );
  }
}