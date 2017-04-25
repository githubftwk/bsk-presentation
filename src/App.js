import React, { Component } from 'react';
import './App.css';
import initSlides from './slides';
import BskPresenter from './BskPresenter';
import BskSlide from './BskPresenter/BskSlide';
class App extends Component {
  constructor(args) {
    super(...args);
  }

  componentDidMount = () => {
  };
  render() {
    return (
      <div className="app" id="app">
        <div className="app_content">
          <BskPresenter slidesMap={initSlides} dim={{width: '100vw', height: '100vh'}}>
            <BskSlide slideID={1} start> <div className="item1" >hello1</div> </BskSlide>
            <BskSlide slideID={2}> <div className="item2" >hello2</div> </BskSlide>
            <BskSlide slideID={3}> <div className="item3" >hello3</div> </BskSlide>
            <BskSlide slideID={4}> <div className="item4" >hello4</div> </BskSlide>
            <BskSlide slideID={5}> <div className="item5" >hello5</div> </BskSlide>
            <BskSlide slideID={6}> <div className="item6" >hello6</div> </BskSlide>
          </BskPresenter>
        </div>
      </div>
    );
  }
}
export default App;
