import React, { Component } from 'react';

import './process.css';

class Process extends Component {  

  render() {
    const Step = props => {
      return <li>{props.step}</li>
    }
    
    const ProcessList = props => {
      const title = props.category.title;
      const steps = props.category.steps;
      return (
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <div className="process-wrapper">
            <h3>{title}</h3>
            <ul className="process-list">
                {steps.map((step, index) => <Step key={index} step={step}/>)}
            </ul>
          </div>
        </div>
      )
    }
    
    const ProcessColumns = props => {
      const categories = props.categories;
      return (
        <div className="row animate-in justify-content-center" data-anim-type="fade-in-up">
          {categories.map((category, index) => <ProcessList key={index} category={category}/>)}
        </div>
      )
    }
    return (
      <section id="process">
        <div className="container">
          <div className="row text-center header">
            <div className="col-12 animate-in" data-anim-type="fade-in-up">
              <h3>{this.props.process.heading}</h3>
              <hr />
            </div>
          </div>
          <ProcessColumns categories={this.props.process.steps} />
        </div>
      </section>
    )
  }
}

export default Process;