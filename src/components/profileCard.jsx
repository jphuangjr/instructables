import React, { Component } from 'react';
import '../App.css';
import InfoBox from "./infoBox";

export default class ProfileCard extends Component {
  /*
   props: link, img, title, authorProfile, authorHandle, channelLink, channel, hoverState,
   userData
  */

    monthDiff(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
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
        Joined: joinedDate.getFullYear()
    }
    var badge;
    if (user.views + user.featuredCount*250000 > 5000000) {
        badge = "Super"
    } else if(user.views + user.instructablesCount*100000 > 1000000) {
        badge = "Active"
    } else if(this.monthDiff.call(this, joinedDate, todayDate) <=4) {
        badge = "New";
    } else {
        badge = "Super";
    }
    console.log("badge: ", badge)
    return (
    <div>
      <div className={this.props.hoverState ? "profile-card" : "profile-card-hidden"} style={{top: this.props.top, left: this.props.left}}>
        {this.props.userData.id &&
            <div className="card-body">
                <div className="card-top-section">
                    <div className="card-profile-image">
                        <img src={user.square3Url} style={{width: "70px", height:"70px", borderRadius: "50%"}}/>
                    </div>
                    <div className="card-user-section">
                        <div className="card-username">
                            <b>{user.screenName}</b> <span className="card-badge">{badge}</span>
                        </div>
                        <div>
                            <button className="card-follow-button">Follow</button> <span className="card-follower-count">{user.followersCount}</span>
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
      {this.props.hoverState && <div className={"guard-box"} style={{top: this.props.top +276, left: this.props.left}}></div>}
    </div>
    );
  }
}