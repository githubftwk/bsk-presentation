import React, { Component } from 'react';
import Rx from 'rxjs/Rx';
import { Motion, spring }  from 'react-motion';
export const SLIDE_UP = 0;
export const SLIDE_LEFT = 1;
export const SLIDE_RIGHT = 2;
export const SLIDE_DOWN = 3;
export const NONE = -1;
class BskSlide extends Component {
  constructor (args) {
    super(...args);
    this.state = {
      currentSlide: {
        id: 1,
        animationName: '',
      },
    };
  }
  componentDidMount = () => {
    const thresholdDesktop = 10;
    const throttleTimeDescktop = 50;
    const appElem = document.getElementById(`bskSlide_root${this.props.slideID}`);
    this.mouseDown$ = Rx.Observable.fromEvent(appElem, 'mousedown');
    this.mouseUp$ = Rx.Observable.fromEvent(appElem, 'mouseup');
    this.mouseMove$ = Rx.Observable.fromEvent(appElem, 'mousemove');
    this.mouseDrag$ = this.mouseDown$.flatMap((md) => {
      const startX = md.clientX,
            startY = md.clientY;
      return this.mouseMove$.map((mm) => {
        mm.preventDefault();
        const moveStartX = mm.clientX,
              moveStartY = mm.clientY;
        const diffX = moveStartX - startX;
        const diffY = moveStartY - startY;
        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (Math.abs(diffX) > thresholdDesktop){
            if (diffX > 0) {
              return {
                action: SLIDE_LEFT,
                diff: diffX,
              };
            } else {
              return {
                action: SLIDE_RIGHT,
                diff: diffX,
              };
            }
          } else {
            return {
              action: NONE,
              diff: diffX,
            };
          }
        } else {
          if (Math.abs(diffY) > thresholdDesktop){
            if (diffY > 0) {
              return {
                action: SLIDE_DOWN,
                diff: diffY,
              };
            } else {
              return {
                action: SLIDE_UP,
                diff: diffY,
              };
            }
          } else {
            return {
              action: NONE,
              diff: diffY,
            };
          }
        }
      }).takeUntil(this.mouseUp$);
    }).throttleTime(throttleTimeDescktop);
    this.mouseDrag$.subscribe((draged) => {
      this.props.findCurrentSlide(this.props.slideID, draged.action);

    });

    const thresholdMobile = 25;
    const throttleTimeMobile = 50;
    this.touchStart$ = Rx.Observable.fromEvent(appElem, 'touchstart');
    this.touchEnd$ = Rx.Observable.fromEvent(appElem, 'touchend');
    this.touchMove$ = Rx.Observable.fromEvent(appElem, 'touchmove');
    this.touchDrag$ = this.touchStart$.flatMap((md) => {
      const startX = md.touches[0].clientX,
            startY = md.touches[0].clientY;
      return this.touchMove$.map((mm) => {
        mm.preventDefault();
        const moveStartX = mm.touches[0].clientX,
              moveStartY = mm.touches[0].clientY;
        const diffX = moveStartX - startX;
        const diffY = moveStartY - startY;
        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (Math.abs(diffX) > thresholdMobile){
            if (diffX > 0) {
              return {
                action: SLIDE_LEFT,
              };
            } else {
              return {
                action: SLIDE_RIGHT,
              };
            }
          } else {
            return {
              action: NONE,
            };
          }
        } else {
          if (Math.abs(diffY) > thresholdMobile) {
            if (diffY > 0) {
              return {
                action: SLIDE_DOWN,
              };
            } else {
              return {
                action: SLIDE_UP,
              };
            }
          } else {
            return {
              action: NONE,
            };
          }
        }
      }).takeUntil(this.touchEnd$);
    }).throttleTime(throttleTimeMobile);
    this.touchDrag$.subscribe((draged) => {
      this.props.findCurrentSlide(this.props.slideID, draged.action);
    });
  };
  slideDown = (customComponent, dim) => {
    const height = dim.height.match(/\d+/)[0];
    const ext = dim.height.replace(/\d+/,'');
    return(
      <Motion defaultStyle={{x: -height}} style={{x: spring(0)}}>
        {
          (value) => {
            return (
              <div className="bskSlide_slideDown"
                style={{ transform: `translateY(${value.x}${ext})` }}
                >
                {customComponent}
              </div>
            );
          }
        }
      </Motion>
    )
  };
  slideUp = (customComponent, dim) => {
    const height = dim.height.match(/\d+/)[0];
    const ext = dim.height.replace(/\d+/,'');
    return(
      <Motion defaultStyle={{x: parseInt(height,10)}} style={{x: spring(0)}}>
        {
          (value) => {
            return (
              <div className="bskSlide_slideUp"
                style={{ transform: `translateY(${value.x}${ext})`}}>
                {customComponent}
              </div>
            );
          }
        }
      </Motion>
    )
  };
  slideRight = (customComponent, dim) => {
    const width = dim.width.match(/\d+/)[0];
    const ext = dim.width.replace(/\d+/,'');
    return(
      <Motion defaultStyle={{x: -width}} style={{x: spring(0)}}>
        {
          (value) => {
            return (
              <div className="bskSlide_slideRight"
                style={{ transform: `translateX(${value.x}${ext})`}}>
                {customComponent}
              </div>
            );
          }
        }
      </Motion>
    )
  };
  slideLeft = (customComponent, dim) => {
    const width = dim.width.match(/\d+/)[0];
    const ext = dim.width.replace(/\d+/,'');
    return(
      <Motion defaultStyle={{x: +width}} style={{x: spring(0)}}>
        {
          (value) => {
            return (
              <div className="bskSlide_slideLeft"
                style={{ transform: `translateX(${value.x}${ext})`}}>
                {customComponent}
              </div>
            );
          }
        }
      </Motion>
    )
  };
  render () {
    
    const { start, slideID, currentSlide } = this.props;
    if(currentSlide === null) {
      if(start === true) {
        return (
            <div id={`bskSlide_root${slideID}`} className="bskSlide_root" style={this.props.dim}>
              { this.props.children}
            </div>
          );
      }
      return (
          <div id={`bskSlide_root${slideID}`} className="bskSlide_root" style={{display: 'none', height: '0', width: '0' }}>
            {this.props.children}
          </div>
      );
    }
    if (currentSlide.slideID === slideID) {
      if(currentSlide.animationName === SLIDE_UP) {
        return (
            <div id={`bskSlide_root${slideID}`} className="bskSlide_root" style={this.props.dim}>
              {this.slideUp(this.props.children, this.props.dim)}
            </div>
          );
      }
      if(currentSlide.animationName === SLIDE_DOWN) {
        return (
            <div id={`bskSlide_root${slideID}`} className="bskSlide_root" style={this.props.dim}>
              {this.slideDown(this.props.children, this.props.dim)}
            </div>
          );
      }
      if(currentSlide.animationName === SLIDE_LEFT) {
        return (
            <div id={`bskSlide_root${slideID}`} className="bskSlide_root" style={this.props.dim}>
              {this.slideLeft(this.props.children, this.props.dim)}
            </div>
          );
      }
      if(currentSlide.animationName === SLIDE_RIGHT) {
        return (
            <div id={`bskSlide_root${slideID}`} className="bskSlide_root" style={this.props.dim}>
              {this.slideRight(this.props.children, this.props.dim)}
            </div>
          );
      }
      return(
        <div id={`bskSlide_root${slideID}`} className="bskSlide_root" style={this.props.dim}>
          { this.props.children}
        </div>
      );
    }
    return (
      <div id={`bskSlide_root${slideID}`} className="bskSlide_root" style={{display: 'none', height: '0', width: '0' }}>
        {this.props.children}
      </div>
    );
  }
}
export default BskSlide;
