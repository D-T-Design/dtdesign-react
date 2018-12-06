import React from "react";

const GalleryImg = props => {
  return (
    <a data-fancybox="gallery" href={props.url} aria-hidden="true">
      <span style={{ display: "none" }}>content</span>
    </a>
  );
};

const Gallery = props => {
  const title = props.client.title;
  const thumb = props.client.thumbURL;
  const galleryURLs = props.client.galleryURLs;
  let firstURL = galleryURLs[0];
  return (
    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 html code">
      <div className="work-wrapper">
        <a data-fancybox="gallery" href={firstURL}>
          <img src={thumb} className="img-fluid" alt={title} />
          <h4>
            {title}&nbsp;&nbsp;
            <ion-icon name="expand" />
          </h4>
        </a>
        {galleryURLs.slice(1).map((url, index) => (
          <GalleryImg key={index} url={url} />
        ))}
      </div>
    </div>
  );
};

const PortfolioColumns = props => {
  const clients = props.clients;
  return (
    <div
      className="row text-center animate-in justify-content-center"
      data-anim-type="fade-in-up"
      id="work-div"
    >
      {clients.map((client, index) => (
        <Gallery key={index} client={client} />
      ))}
    </div>
  );
};

export { PortfolioColumns };
