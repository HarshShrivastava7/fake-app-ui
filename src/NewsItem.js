import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { apiTitle, excerpt, media, published_date, url, publisher } = this.props;
    return (
      <div
        style={{
          flex: "30%",
          margin: "0.2em",
          padding: "1em",
          minWidth: "219px"
        }}
      >
        <div>
          <div className="card col-md-12">
            <img src={media} className="card-img-top" alt="..." />
            <div className="card-body" style={{ border: "3px solid #7E7D89", marginTop: "3px" }}>
              <h5 className="card-title">{apiTitle}</h5>
              <p className="card-text">{excerpt}</p>
              <h6 className="card-text">
                <small className="text-muted" style={{ fontSize: "1.2em" }}>
                  Last Updated On {published_date.slice(0, 10)}
                </small>
              </h6>
              <a href={url} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">
                Read More
              </a>
              <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{right: "-50px"}}>
                {publisher}
                <span className="visually-hidden">unread messages</span>
              </span>
            </div>
          </div>

          {/* {console.log(this.month)} */}
        </div>
      </div>
    );
  }
}
