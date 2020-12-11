import {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import UrlForm from './components/UrlForm/UrlForm.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
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
      imageUrl: '',
      fetched: false,
      route: 'signin',
      isSignedIn: false
    }
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    let currentComponent = this;

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

      currentComponent.setState({imageUrl: res.body.response.image_url});
      currentComponent.setState({fetched: true});
    });
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
                params={particlesOptions}
              />
        <Navigation 
        isSignedIn={this.state.isSignedIn}
        onRouteChange={this.onRouteChange} />
        
        {this.state.route === 'home' 
        ?<div>
          <Logo />
          <UrlForm 
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          { this.state.fetched ? <BackgroundRemoval imageUrl={this.state.imageUrl}/> : null }
        </div>
        : (
            this.state.route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}
export default App;
