import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from "./components/card"
import cardData from "./data";

/*
   props: link, img, imgAlt, title, authorProfile, authorHandle, channelLink, channel
  */
 var sampleCookie = "_ga=GA1.2.641847360.1527874798; OPTOUTMULTI_REF=ccdfba85-6d7c-4919-abd7-6ace0e757119; OPTOUTMULTI_TYPE=P; __gads=ID=c9f675a6af192853:T=1527874799:S=ALNI_MZjvdzdq-AASRAGVciSkuMEj5zLeQ; __uis=f32cb137-21c6-11e8-a7ae-0cc47a0a9bc8; _gid=GA1.2.1441115907.1528008852; OPTOUTMULTI_GEO=US; APPSERVER=app13.instructables.com; JSESSIONID=aaaTBYGU_pHzk5Dgbs3ow; __utmz=utmcm=unidentified_category; authy=rod64damage; isLoggedIn=070c7b7d-8751-4eb8-b04c-0e31108dca98; nonProUser=true; nonAdminUser=true; ibleuser=%7B%22id%22%3A%22M64PUW4JHUTU5UM%22%2C%22screenName%22%3A%22Joshua%20P.H%22%2C%22locale%22%3Anull%2C%22pro%22%3Afalse%2C%22staff%22%3Afalse%2C%22admin%22%3Afalse%2C%22role%22%3A%22USER%22%2C%22instructablesCount%22%3A0%2C%22draftsCount%22%3A0%2C%22publishedCollectionsCount%22%3A0%2C%22draftCollectionsCount%22%3A0%2C%22favoritesCount%22%3A0%2C%22commentCount%22%3A0%2C%22tinyUrl%22%3A%22https%3A%2F%2Fwww.instructables.com%2Ffiles%2Fderiv%2FFF7%2FOJBK%2FJHUTU5VC%2FFF7OJBKJHUTU5VC.TINY.jpg%22%2C%22emailVerified%22%3Atrue%2C%22email%22%3A%22jphuangjr%40gmail.com%22%2C%22contestOffsets%22%3Anull%2C%22subscriptionsCount%22%3A0%2C%22shortcuts%22%3A%5B%5D%2C%22inboxNewMessageCount%22%3A0%2C%22courseCount%22%3A0%2C%22draftCoursesCount%22%3A0%2C%22courseEnrollmentCount%22%3A0%2C%22editableResourceTypes%22%3A%5B%5D%7D; newUser=true; iblesource=%7B%22sourceUrl%22%3A%22%2Fmember%2FPieBaby89%2F%22%2C%22sourcea%22%3A%22profile%3Aheader%22%2C%22sourceaUrl%22%3A%22%2Fmember%2F38ren%2F%22%2C%22returnUrl%22%3A%22%2Fmember%2F38ren%2F%22%2C%22roles%22%3A%22*%22%7D; feedPageToggle=personalizedFeed; OPTOUTMULTI=0%3A0%7Cc3%3A0%7Cc4%3A0%7Cc1%3A0%7Cc5%3A0%7Cc2%3A0%7Cc6%3A0; ADSK_GDPR_OPT_LENGTH=Sun%2C%2017%20Jun%202018%2022%3A25%3A52%20GMT; utag_main=v_id:0163bc6f41e8001269a5cb87ebd00407900410710093c$_sn:5$_ss:0$_st:1528066552032$ses_id:1528063254645%3Bexp-session$_pn:27%3Bexp-session";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myData: {}
    };
  }
  componentDidMount() {
    var user = unescape(sampleCookie /* Replace with document.cookie on development */).split('"screenName":"')[1].split('",')[0];
    fetch('http://crossorigin.me/https://www.instructables.com/json-api/showAuthorModel?screenName=' + user,{
      mode: 'cors',
      method: 'GET'
    })
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({myData: result})
      }
    )
  }
  render() {
    const scope = this;
    return (
      <main role="main">
        <div id="explore-wrapper" className="full-wrapper">
          <div id="explore-main" className="container">
            <div className="explore-content">
              <ul className="explore-covers-list clearfix">
                {cardData.map(function(v){
                  v.myData = scope.state.myData;
                  return <Card {...v}/>
                })}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
