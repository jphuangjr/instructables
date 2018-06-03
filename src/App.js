import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from "./components/card"

/*
   props: link, img, imgAlt, title, authorProfile, authorHandle, channelLink, channel
  */
var props = {
  link:"https://www.instructables.com/id/Lamb-Dum-Biryani-in-Crockpot/",
  img:"https://cdn.instructables.com/FS0/GPTB/JHKTRA9Y/FS0GPTBJHKTRA9Y.RECTANGLE1.jpg",
  title:"Lamb Dum Biryani in Crockpot",
  member:"PieBaby89",
  channelLink: "https://www.instructables.com/food/main-course/",
  channel: "Main Course"
};

class App extends Component {
  render() {
    return (
      <main role="main">
        <div id="explore-wrapper" className="full-wrapper">
          <div id="explore-main" className="container">
            <div className="explore-content">
              <ul className="explore-covers-list clearfix">
                <Card {...props}/>
                <Card {...props}/>
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
