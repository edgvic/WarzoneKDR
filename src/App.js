import {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import UrlForm from './components/UrlForm/UrlForm.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import BackgroundRemoval from './components/BackgroundRemoval/BackgroundRemoval.js';
import Rank from './components/Rank/Rank.js';

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
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imageUrl: '',
      fetched: false,
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: 'asd',
        email: '',
        entries: 0,
        joined: ''
      }
    }
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
  }


  loadUser = (user) => {
    this.setState({user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
        }
    })
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
      "x-rapidapi-key": "14be53dd46mshb96e7293ae4d8cep10628ajsn33aca4aa3080",
      "x-rapidapi-host": "background-removal.p.rapidapi.com",
      "useQueryString": true
    });

    req.form({
      "image_url": this.state.input
    });

    
    req.end(function (res) {
      if (res.error) throw new Error(res.error);
      fetch('http://localhost:3000/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
        id: currentComponent.state.user.id
        })
      })
      .then(response => response.json())
      .then(count => {
        currentComponent.setState(Object.assign(currentComponent.state.user, {entries: count}))
      })
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
          <Rank user={this.state.user}/>
          <UrlForm 
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          { this.state.fetched ? <BackgroundRemoval imageUrl={this.state.imageUrl}/> : null }
        </div>
        : (
            this.state.route === 'signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}
export default App;
