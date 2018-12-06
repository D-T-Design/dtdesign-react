import React, { Component } from "react";
import { PortfolioColumns } from './work.elements';

import "./work.css";

import SRT_Thumb from "../../assets/img/portfolio/thumb1.jpg";
import SRT_BC from "../../assets/img/portfolio/srt-bc.jpg";
import SRT_Logo from "../../assets/img/portfolio/srt-logo.jpg";

import Outta_Thumb from "../../assets/img/portfolio/thumb3.jpg";
import Outta_Logo from "../../assets/img/portfolio/outtatune-logo.jpg";
import Outta_Paper from "../../assets/img/portfolio/outtatune-paper.jpg";
import Outta_Flyer from "../../assets/img/portfolio/outtatune-flyer.jpg";

import Sunny_Thumb from "../../assets/img/portfolio/thumb2.jpg";
import Sunny_Logo from "../../assets/img/portfolio/sunnyside-logo.jpg";
import Sunny_BC from "../../assets/img/portfolio/sunnyside-bc.jpg";
import Sunny_Sign from "../../assets/img/portfolio/sunnyside-sign.jpg";

import Treats_Thumb from "../../assets/img/portfolio/thumb5.jpg";
import Treats_Logo from "../../assets/img/portfolio/treats-logo.jpg";
import Treats_Truck from "../../assets/img/portfolio/treats-truck.jpg";
import Treats_BC from "../../assets/img/portfolio/treats-bc.jpg";

import Fight_Thumb from "../../assets/img/portfolio/thumb4.jpg";
import Fight_Logo from "../../assets/img/portfolio/flag-logo.jpg";
import Fight_Shirt from "../../assets/img/portfolio/flag-shirt.jpg";

import Justice_Thumb from "../../assets/img/portfolio/thumb6.jpg";
import Justice_Logo from "../../assets/img/portfolio/nvjustice-logo.jpg";
import Justice_Sign from "../../assets/img/portfolio/nvjustice-sign.jpg";
import Justice_Press from "../../assets/img/portfolio/nvjustice-press.jpg";
import Justice_Silver from "../../assets/img/portfolio/nvjustice-silver.jpg";

class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: "Work",
      clients: [
        {
          title: "S-R-T Services, Inc.",
          thumbURL: SRT_Thumb,
          galleryURLs: [SRT_BC, SRT_Logo]
        },
        {
          title: "Outta Tune Guitar Shop",
          thumbURL: Outta_Thumb,
          galleryURLs: [Outta_Logo, Outta_Paper, Outta_Flyer]
        },
        {
          title: "Sunny Side Up Breakfast Café",
          thumbURL: Sunny_Thumb,
          galleryURLs: [Sunny_Logo, Sunny_BC, Sunny_Sign]
        },
        {
          title: "Treats to You Ice Cream",
          thumbURL: Treats_Thumb,
          galleryURLs: [Treats_Logo, Treats_Truck, Treats_BC]
        },
        {
          title: "Fight Like A Girl T-Shirts",
          thumbURL: Fight_Thumb,
          galleryURLs: [Fight_Logo, Fight_Shirt]
        },
        {
          title: "Nevada Justice Attorneys",
          thumbURL: Justice_Thumb,
          galleryURLs: [
            Justice_Logo,
            Justice_Sign,
            Justice_Press,
            Justice_Silver
          ]
        }
      ]
    };
  }

  render() {
    return (
      <section id="work" className="darken">
        <div className="container">
          <div
            className="row text-center header animate-in justify-content-center"
            data-anim-type="fade-in-up"
          >
            <div className="col-12">
              <h3>{this.state.heading}</h3>
              <hr />
            </div>
          </div>
          <PortfolioColumns clients={this.state.clients} />
        </div>
      </section>
    );
  }
}

export default Work;
