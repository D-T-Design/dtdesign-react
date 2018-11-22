import React, { Component } from 'react';

function Step(props) {
  return <li>{props.step}</li>
}

function ProcessList(props) {
  const title = props.category.title;
  const steps = props.category.steps;
  return (
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
      <div className="process-wrapper">
        <h3>{title}</h3>
        <ul className="process-list">
            {steps.map((step) => <Step key={step} step={step}/>)}
        </ul>
      </div>
    </div>
  )
}

function ProcessColumns(props) {
  const categories = props.categories;
  return (
    <div className="row animate-in justify-content-center" data-anim-type="fade-in-up">
      {categories.map((category) => <ProcessList key={category} category={category}/>)}
    </div>
  )
}

class Process extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: 'My Process',
      categories: [
        {
          title: 'Discovery',
          steps: [
            'Discuss goals & solutions',
            'Determine scope of project & budget',
            'Identify client audience',
            'Explore market conditions & competition'
          ]
        },
        {
          title: 'Proposal',
          steps: [
            'Present proposal to illustrate project goals',
            'Define details of audience & competition',
            'Propose deliverable services & quote value'
          ]
        },
        {
          title: 'Brainstorm & Design',
          steps: [
            'Research and conceptualize ideas',
            'Plan & sketch initial designs',
            'Create first draft digitally',
            'Formalize artwork presentation'
          ]
        },
        {
          title: 'Present Concepts',
          steps: [
            'Engage with client and present artwork',
            'Exchange thoughts regarding concepts',
            'Suggest revisions based on discussion'
          ]
        },
        {
          title: 'Revisions & Finalization',
          steps: [
            'Adjust digital rendering',
            'Continue dialogue and revisions',
            'Prepare finalized presentation for approval'
          ]
        },
        {
          title: 'Approval & Deliveries',
          steps: [
            'Finalize contract upon approval',
            'Release deliverable files & rights',
            'Follow up contact to ensure goals have been accomplished'
          ]
        }
      ]
    }
  }
  

  render() {
    return (
      <section id="process">
        <div className="container">
          <div className="row text-center header">
            <div className="col-12 animate-in" data-anim-type="fade-in-up">
              <h3>My Process</h3>
              <hr />
            </div>
          </div>
          <ProcessColumns key={this.state.categories} categories={this.state.categories} />
        </div>
      </section>
    )
  }
}

export default Process;