import {Component} from 'react';
import unirest from 'unirest';
import Particles, { InteractivityDetect } from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import TagForm from './components/TagForm/TagForm.js';
import BackgroundRemoval from './components/BackgroundRemoval/BackgroundRemoval.js';

import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 500
      }
    }
  },
  interactivity: {
    onhover: {
      enable: true
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    {/*this.setState({imageUrl: this.state.input})*/}

    var unirest = require("unirest");

    var req = unirest("POST", "https://background-removal.p.rapidapi.com/remove");
    
    req.headers({
      "content-type": "application/x-www-form-urlencoded",
      "x-rapidapi-key": "c7688b5c0cmsh4fbf294031282f9p11c9b9jsndcc4c5c219da",
      "x-rapidapi-host": "background-removal.p.rapidapi.com",
      "useQueryString": true
    });
    
    req.form({
      "image_url": this.state.input
    });
    
    
    req.end(function (res) {
      if (res.error) throw new Error(res.error);
    
      console.log(res.body);
      {/*this.setState({imageUrl: res.body.image_url}) */}
    });
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
                params={particlesOptions}
              />
        <Navigation />
        <Logo />
        <TagForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <BackgroundRemoval imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}
export default App;
