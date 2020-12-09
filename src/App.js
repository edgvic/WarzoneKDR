import Particles, { InteractivityDetect } from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import TagForm from './components/TagForm/TagForm.js';
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

function App() {
  return (
    <div className="App">
      <Particles className="particles"
              params={particlesOptions}
            />
      <Navigation />
      <Logo />
      <TagForm />
      {/*<Stats />*/}
    </div>
  );
}

export default App;
