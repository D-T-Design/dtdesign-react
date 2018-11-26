import React, { Component } from "react";
import { Nav, Hero, Services, Process, Work, About, Contact, Footer } from "./components/compiler";
import "./App.css";

import data from "./global.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data
    };
  }
  render() {
    return (
      <div className="App">
        <Nav />
        <Hero headlines={this.state.data.hero} />
        <Services services={this.state.data.services} />
        <Process process={this.state.data.process} />
        <Work clients={this.state.data.clients} />
        <About about={this.state.data.about} />
        <Contact />
        <Footer />
      </div>
    );
  }
}

export default App;
