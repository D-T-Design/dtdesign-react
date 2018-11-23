import React, { Component } from 'react';
import './App.css';
import Nav from './components/nav';
import Hero from './components/hero';
import Services from './components/services';
import Process from './components/process';
import Work from './components/work';
import About from './components/about';
import Contact from './components/contact';
import Footer from './components/footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Hero />
        <Services />
        <Process />
        <Work />
        <About />
        <Contact />
        <Footer />
      </div>
    );
  }
}

export default App;
