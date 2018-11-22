import React, { Component } from 'react';

function Service(props) {
  return <li>{props.service}</li>
}

function ServiceList(props) {
  const title = props.category.title;
  const services = props.category.services;
  const icon = props.category.icon;
  return (
    <div className='col-xs-12 col-sm-12 col-md-6 col-lg-4'>
      <div className='services-wrapper'>
        <ion-icon name={icon}></ion-icon>
        <h3>{title}</h3>
        <ul className='service-list'>
          {services.map((service) => <Service key={service} service={service}/>)}
        </ul>
      </div>
    </div>
  )
}

function CategoryColumns(props) {
  const categories = props.categories;
  return (
    <div className="row animate-in justify-content-center" data-anim-type="fade-in-up">
      {categories.map((category) => <ServiceList key={category} category={category}/>)}
    </div>
  )
}

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: 'Services',
      categories: [
        {
          title: 'Logos & Branding',
          icon: 'bulb',
          services: [
            'Be Distinctive',
            'Improve Response',
            'Increase Referrals',
            'Maximize Profits',
            'Refresh Your Image',
            'Improve Quality',
            'Achieve a New Level of Success',
            'A Bargain For The Value'
          ]
        },
        {
          title: 'Print Design',
          icon: 'print',
          services: [
            'Business Cards',
            'Flyers & Brochures',
            'Envelopes & Letterhead',
            'Table Tents, Placemats & Menus',
            'Door Hangers & Stickers',
            'Presentation Folders',
            'Office Forms',
            'Greeting Cards, Invitations & Postcards'
          ]
        },
        {
          title: 'Sign & Storefront Design',
          icon: 'image',
          services: [
            'Decals, Labels & Building Signs',
            'Posters, Interior Signs & Wall Graphics',
            'Banners, Flags, Spinners & A-Frames',
            'Realty, Yard & Site Signs',
            'Regulatory Signs',
            'Wayfinding, Menus & Directories',
            'Vehicle Graphics - Fleet & Wraps',
            'T-Shirt & Uniform Design'
          ]
        }
      ]
    }
  }
  

  render() {
    return (
      <section id="services" className="darken">
        <div className="container">
          <div className="row text-center header">
            <div className="col-12 animate-in" data-anim-type="fade-in-up">
              <h3>{this.state.heading}</h3>
              <hr />
            </div>
            <CategoryColumns key={this.state.categories} categories={this.state.categories}/>
          </div>
        </div>
      </section>
    )
  }
}

export default Services;