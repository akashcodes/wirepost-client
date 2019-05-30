
import React from "react"

import axios from 'axios'

import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../stylesheets/feed.css"
import "../js/feed"

class Feed extends React.Component {
  constructor(props) {
    super(props)
    // Articles constructor
    this.state = {
      category: this.props.category,
      articles: [],
      offset: this.props.offset || 0,
      limit: this.props.limit || 3
    }
  }

  componentDidMount() {
    let api_url = "http://localhost:8000/api/articles/"
    
    if(this.state.category)
      api_url += this.state.category
    
    api_url += "?offset="+this.state.offset
    api_url += "&limit="+this.state.limit
    
    axios.get(api_url)
    .then(json => {
      console.log(json)
      this.setState({articles: json.data})
    })
  }
}


export class BannerFeed extends Feed {

  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.state.articles);
    return (
      <div className={"banner-cont "+this.props.className}>
        <Carousel className="banner" showStatus={false}>
          {this.state.articles.slice(0, this.state.limit).map((article, index) => {
            return(
                <div className="slide" key={article.id}>
                  <img className="image" src={article.banner} />
                  <p className="legend text">{article.title}</p>
                </div>
              )
          })}
        </Carousel>
      </div>
    )
  }
}

export class GridFeed extends Feed {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={"feed-grid "+this.props.className} style={
        {
          gridTemplateColumns: "repeat("+this.props.columns+", 1fr)",
          gridTemplateRows: "repeat("+this.props.rows+", 1fr)",
        }
      }>
        {this.state.articles.slice(0, this.state.limit).map((article, index) => {
          return(
              <div className="grid-news-box" key={article.id}>
                <div className="grid-news-image" style={{backgroundImage: "url("+article.banner+")"}} />
                <p className="grid-news-text">{article.title}</p>
              </div>
            )
        })}
      </div>
    )
  }
}