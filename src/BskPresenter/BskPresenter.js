import React, { Component } from 'react';
import { SLIDE_UP, SLIDE_LEFT, SLIDE_RIGHT, SLIDE_DOWN, NONE } from './BskSlide';
class BskPresenter extends Component {
  constructor (args) {
    super(...args);
    this.state = {
      currentSlide: null,
    };
  }
  componentDidMount = () => {
  };
  findCurrentSlide = (currSlideId, action) => {

    const allSlides = this.props.slidesMap;
    if (action === NONE) {
      this.setState({
        currentSlide: {
           slideID: currSlideId,
           animationName: -1,
          //  canAnimate: true,
         }
      });
    }
    if (action === SLIDE_UP) {

      const upSlide = this.findUpSlide(currSlideId, allSlides);
      if (upSlide !== null) {
        this.setState({
          currentSlide: {
             slideID: upSlide.slideID,
             animationName: SLIDE_UP,
           }
        });
      } else {
        this.setState({
          currentSlide: {
            // canAnimate: false,
            slideID: currSlideId,
            animationName: -1,
          }
        });
      }
    }
    if (action === SLIDE_LEFT) {
      const leftSlide = this.findLeftSlide(currSlideId, allSlides);
      if (leftSlide !== null) {
        this.setState({
          currentSlide: {
             slideID: leftSlide.slideID,
             animationName: SLIDE_LEFT,
           }
        });
      } else {
        this.setState({
          currentSlide: {
            // canAnimate: false,
            slideID: currSlideId,
            animationName: -1,
          }
        });
      }
    }
    if (action === SLIDE_RIGHT) {
      const rightSlide = this.findRightSlide(currSlideId, allSlides);
      if (rightSlide !== null) {
        this.setState({
          currentSlide: {
             slideID: rightSlide.slideID,
             animationName: SLIDE_RIGHT,
           }
        });
      } else {
        this.setState({
          currentSlide: {
            // canAnimate: false,
            slideID: currSlideId,
            animationName: -1,
          }
        });
      }
    }
    if (action === SLIDE_DOWN) {
      const downSlide = this.findDownSlide(currSlideId, allSlides);
      if (downSlide !== null) {
        this.setState({
          currentSlide: {
             slideID: downSlide.slideID,
             animationName: SLIDE_DOWN,
           }
        });
      } else {
        this.setState({
          currentSlide: {
            // canAnimate: false,
            slideID: currSlideId,
            animationName: -1,
          }
        });
      }
    }
  };
  findSlideById = (slideId, allSlides) => {
    const res = allSlides.reduce((total, currentValue) => {
      if (currentValue.slideID === slideId) {
        total = currentValue;
      }
      return total;
    }, null);
    return res;
  };
  findLeftSlide = (slideId, allSlides) => {
    const thisSlide = this.findSlideById(slideId, allSlides);
    if (thisSlide !== null) {
      return this.findSlideById(thisSlide.left, allSlides);
    }
    return null;
  }
  findRightSlide = (slideId, allSlides) => {
    const thisSlide = this.findSlideById(slideId, allSlides);
    if (thisSlide !== null) {
      return this.findSlideById(thisSlide.right, allSlides);
    }
    return null;
  }
  findUpSlide = (slideId, allSlides) => {
    const thisSlide = this.findSlideById(slideId, allSlides);
    if (thisSlide !== null) {
      return this.findSlideById(thisSlide.up, allSlides);
    }
    return null;
  }
  findDownSlide = (slideId, allSlides) => {
    const thisSlide = this.findSlideById(slideId, allSlides);
    if (thisSlide !== null) {
      return this.findSlideById(thisSlide.down, allSlides);
    }
    return null;
  }
  render () {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        findCurrentSlide: this.findCurrentSlide,
        currentSlide: this.state.currentSlide,
        dim: this.props.dim,
      })
    );
    return (
      <div className="bskPresenter_root" style={this.props.dim}>
        {childrenWithProps}
      </div>
    );
  }
}
export default BskPresenter;
