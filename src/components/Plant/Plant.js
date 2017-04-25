import React, { Component } from 'react';
import './Plant.css';

class Plant extends Component {
  constructor(args) {
    super(...args);
    this.state = {
      moistureLevel: 0,
    };
  }
  handleBtnClick = (event) => {
    this.setState({
      moistureLevel: this.props.moisture,
    });
  }
  render() {
    const { moistureLevel } = this.state;
    return (
      <div className="plantRoot">
        <div className="plantContainer">
          <svg
            className="plant"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="plant_1"
            viewBox="0 0 300 512"
            preserveAspectRatio="xMinYMax meet"
            width="300"
            height="512"
            >
            <defs>
              <linearGradient id="grad1" x1="100%" y1={`${100 - moistureLevel}%`} x2="100%" y2="100%">
                <stop offset="1%" style={{stopColor: '#a09e9e', stopOpacity: '1'}} >
                </stop>
                <stop offset="2%" style={{stopColor: '#0dd6ec', stopOpacity: '1'}}>
                </stop>
              </linearGradient>
            </defs>
            <path
              fill="url(#grad1)"
              d="M329.122,355.48l-4.598-37.206c-0.526-4.259-4.145-7.458-8.436-7.458h-66.332v-58.042
                c35.413-4.218,62.967-34.415,62.967-70.944c0-4.694-3.807-8.5-8.501-8.5c-21.804,0-41.347,9.827-54.466,25.271v-24.001
                c8.632-2.048,16.285-7.153,21.491-14.359c1.958,0.316,3.928,0.48,5.893,0.48c9.658,0,19.154-3.773,26.204-10.823
                c8.487-8.485,12.209-20.506,10.341-32.096c9.513-6.874,15.381-18.001,15.381-29.993c0-12.003-5.872-23.133-15.384-29.998
                c1.871-11.584-1.85-23.604-10.337-32.091c-8.487-8.486-20.507-12.207-32.095-10.339C264.377,5.868,253.25,0,241.257,0
                c-11.992,0-23.119,5.868-29.994,15.381c-11.587-1.868-23.609,1.852-32.096,10.339c-8.49,8.49-12.208,20.513-10.337,32.094
                c-9.514,6.869-15.383,17.996-15.383,29.996c0,11.993,5.868,23.12,15.38,29.993c-1.868,11.588,1.854,23.609,10.339,32.096
                c7.052,7.051,16.545,10.824,26.205,10.824c1.964,0,3.935-0.165,5.894-0.481c5.207,7.208,12.86,12.312,21.491,14.36v60.386
                c-13.119-15.445-32.662-25.271-54.467-25.271c-4.694,0-8.5,3.806-8.5,8.5c0,36.529,27.554,66.726,62.967,70.944v21.658h-66.333
                c-4.291,0-7.909,3.199-8.436,7.458l-4.598,37.206c-0.299,2.417,0.454,4.847,2.067,6.672s3.933,2.87,6.368,2.87h9.078l13.754,110.044
                c0.532,4.254,4.147,7.446,8.435,7.446h96.33c4.287,0,7.902-3.192,8.435-7.446l13.754-110.044h9.075c2.436,0,4.755-1.045,6.368-2.87
                S329.421,357.898,329.122,355.48z
                M294.931,191.124c-3.901,22.601-21.78,40.479-44.381,44.381
                C254.451,212.904,272.33,195.026,294.931,191.124z
                M259.454,146.905c-3.236,7.111-10.379,11.707-18.197,11.707
                c-5.139,0-9.979-1.995-13.617-5.376c1.344-1.02,2.631-2.126,3.842-3.337c5.019-5.019,8.443-11.355,9.956-18.176
                c5.985-0.024,11.693-1.249,16.891-3.45c1.875,3.095,2.917,6.667,2.917,10.349C261.246,141.51,260.644,144.294,259.454,146.905z
                M182.16,106.009c-7.115-3.246-11.713-10.39-11.713-18.2c0-5.141,1.998-9.981,5.384-13.62c1.019,1.341,2.125,2.626,3.336,3.837
                c5.018,5.019,11.355,8.435,18.174,9.948c0.023,5.991,1.247,11.705,3.451,16.908c-3.096,1.875-6.671,2.917-10.354,2.917
                C187.549,107.799,184.765,107.197,182.16,106.009z
                M214.337,87.808c0-14.844,12.076-26.92,26.92-26.92s26.92,12.076,26.92,26.92
                c0,14.843-12.076,26.919-26.92,26.919S214.337,102.651,214.337,87.808z
                M300.353,69.612c7.116,3.239,11.714,10.381,11.714,18.197
                c0,5.135-1.997,9.973-5.38,13.613c-1.021-1.344-2.129-2.63-3.341-3.839c-5.019-5.02-11.351-8.443-18.173-9.955
                c-0.024-5.992-1.25-11.706-3.456-16.909c3.083-1.881,6.621-2.9,10.36-2.9C294.965,67.82,297.745,68.421,300.353,69.612z
                M291.324,137.878c-3.633,3.634-8.468,5.644-13.436,5.824c0.229-1.672,0.357-3.366,0.357-5.08c0-7.104-2.063-14.011-5.823-19.904
                c4.057-4.09,7.311-8.975,9.519-14.393c3.51,0.85,6.739,2.636,9.391,5.288c2.039,2.033,3.582,4.426,4.586,7.106
                C298.657,124.044,296.854,132.349,291.324,137.878z
                M291.324,37.741c3.636,3.635,5.647,8.47,5.828,13.436
                c-1.671-0.229-3.363-0.357-5.076-0.357c-7.103,0-14.01,2.063-19.906,5.824c-4.091-4.059-8.976-7.313-14.396-9.521
                c0.85-3.511,2.634-6.737,5.287-9.39c2.033-2.039,4.426-3.582,7.106-4.585C277.491,30.408,285.796,32.213,291.324,37.741z
                M223.057,28.713C226.303,21.598,233.447,17,241.257,17c5.134,0,9.973,1.997,13.614,5.38c-1.344,1.021-2.63,2.128-3.839,3.34
                c-5.018,5.018-8.442,11.354-9.955,18.172c-5.985,0.024-11.692,1.248-16.89,3.449c-1.877-3.097-2.92-6.671-2.92-10.351
                C221.267,34.103,221.869,31.318,223.057,28.713z
                M191.188,37.741c3.634-3.633,8.469-5.646,13.436-5.829
                c-0.229,1.672-0.357,3.364-0.357,5.078c0,7.103,2.064,14.01,5.826,19.905c-4.057,4.089-7.31,8.973-9.519,14.391
                c-3.511-0.85-6.739-2.633-9.385-5.279c-2.049-2.048-3.591-4.437-4.588-7.112C183.858,51.573,185.659,43.27,191.188,37.741z
                M191.188,137.878c-3.635-3.634-5.646-8.469-5.829-13.436c1.672,0.229,3.365,0.357,5.078,0.357c7.108,0,14.017-2.063,19.911-5.824
                c4.086,4.052,8.963,7.302,14.374,9.51c-0.863,3.52-2.656,6.787-5.261,9.393c-2.039,2.039-4.434,3.582-7.114,4.585
                C205.02,145.204,196.714,143.404,191.188,137.878z
                M187.583,227.509c22.601,3.902,40.479,21.78,44.381,44.381
                C209.363,267.988,191.484,250.11,187.583,227.509z
                M173.938,327.817h134.636l2.497,20.206h-139.63L173.938,327.817z
                M281.919,465.513h-81.322l-12.56-100.49h106.442L281.919,465.513z"
            />
          </svg>
        </div>
        <div className="plantRoot_btnCheckContainer" onClick={this.handleBtnClick}>
          <div className="plantRoot_btnCheck">
            Chech
          </div>
        </div>
      </div>
    );
  }
}

export default Plant;