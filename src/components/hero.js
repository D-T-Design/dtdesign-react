import React, { Component } from 'react';

class Hero extends Component {
    render() {
        return (
            <div id="home">
                <div className="row animate-in align-items-center justify-content-center" data-anim-type="fade-in-up">
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                    </a>
                    <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-8">
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                            <div className="carousel-item active">
                                <h1>I help small businesses with graphic design!</h1>
                                <p>Tired of the same look?&nbsp;&nbsp;Starting a new business?<br/>Let's get in touch and we will work together to bring your ideas to life!</p>
                            </div>
                            <div className="carousel-item">
                                <h1>Discover the Hidden Value of Your Business!</h1>
                                <p>Branding design transforms the perception of your business, unlocking undiscovered value and producing more leads.</p>
                            </div>
                            <div className="carousel-item">
                                <h1>Boost Profit Growth and Reach New Clients!</h1>
                                <p>Send your message with quality Print and Sign designs.&nbsp;&nbsp;Bold designs and consistent brand adherence attracts new customers.</p>
                            </div>
                            </div>
                            <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            </ol>
                        </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xs-10 col-sm-10 col-md-8 col-lg-6 scroll-me">
                        <p className="cta-desc">Graphic design is an investment toward your success!</p>
                        <a href="#services" className=" btn button-custom btn-custom-two">Here's What You Need</a>
                        </div>
                    </div>
                    </div>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                    </a>
                </div>
                </div>
        );
    }
}

export default Hero;