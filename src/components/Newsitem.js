import React, { Component } from "react";

export class Newsitem extends Component {

  render() {
    let { title, desc, imgurl, newsurl, author,date, source} = this.props;
    return (
      <div className="my-3 ">
        <div className="card mx-3">
          <div style={{display:'flex', justifyContent:'flex-end', right:'0'}}>
            <span className=" position-absolute badge rounded-pill bg-primary">{source}
            </span></div>         
          <img src={!imgurl?"https://media.istockphoto.com/id/1390033645/photo/world-news-background-which-can-be-used-for-broadcast-news.jpg?b=1&s=170667a&w=0&k=20&c=glqFWZtWU4Zqyxd8CRu5_Or81zqwe7cyhturXaIFEOA=":imgurl} className="card-img-top" alt="..." style={{height: "180px"}} />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{desc}...</p>
            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
