import React, { Component } from 'react';

//import '../stylesheets/page-transition.css';
import { CSSTransitionGroup } from 'react-transition-group'
import axios from 'axios'
import { NavLink } from "react-router-dom";
import { FooterHome } from "../components/FooterHome.js"

import "../stylesheets/home.css"

const api_root = "http://0.0.0.0:8000/api/"

const SCROLL_LOAD_THRES = 150

var FeaturedArticle = (props) => {
  return(
    <NavLink to={"/news/"+props.id} className="article" key={props.id}>
      <div className="title"><p>{props.title.length > 80 ? props.title.substring(0, 80)+"...": props.title}</p></div>
      <p className="date">{"Published on: "+props.creation_date.split("T")[0]+" in"}<span style={{
        color: props.color,
      }}>&nbsp;&nbsp;{props.category}</span></p>
      <div className="banner" style={{
        backgroundImage: 'url('+props.banner+')'
      }} ></div>
      <div className="link-mask"></div>
    </NavLink>
  )
}

var FeedArticle = (props) => {
  return(
    <NavLink to={"/news/"+props.id} key={props.id}>
      <div className="article" key={props.id}>
        <div className="ambient-bar"></div>
        <div className="title"><p>{props.title.length > 100 ? props.title.substring(0, 100)+"...": props.title}</p></div>
        <div className="content"><p>{props.content.length > 200 ? props.content.substring(0, 150)+"...": props.content}</p></div>
        <div className="meta">
          <p className="date">{"Published on: "+props.creation_date.split("T")[0]+" in"}<span style={{
            color: props.color,
          }}>&nbsp;&nbsp;{props.category}</span></p>
        </div>
        <div className="banner" style={{
          backgroundImage: 'url('+props.banner+')'
        }} ></div>
        <div className="link-mask"></div>
      </div>
      {//<div className="feed-border"></div>
      }
    </NavLink>
  )
}


export class Home extends Component {

  

  constructor(props) {
    super(props)
    this.state = {
      category: this.props.category,
      articles: [],
      featured: [],
      currentOffset: 0,
      count: 0,
      limit: this.props.limit || 12
    }
  }

  componentDidMount() {
    // Add scroll load more

    
    document.onscroll = () => {
      let e = document.getElementsByClassName("loadMore")[0]
      if (e)
        if(e.offsetTop < window.scrollY + SCROLL_LOAD_THRES) {
          this.loadArticles(5)
        }
    }
    
    
    
    let api_url = api_root+"articles/"
    
    if(this.state.category)
      api_url += this.state.category
    
    api_url += "?offset=0"
    api_url += "&limit=4"
    axios.get(api_url)
    .then(json => {
      if(json.data) {
        let feed = []
        json.data.map((element, index) => {
          let el = <FeaturedArticle key={element.id} {...element}/>
          feed.push(el)
        })
        this.setState({featured: feed})
      }
    })

    api_url = api_root+"articles/"
    
    if(this.state.category)
      api_url += this.state.category
    
    api_url += "?offset=0"
    api_url += "&limit=10"
    axios.get(api_url)
    .then(json => {
      if(json.data) {
        let feed = []
        json.data.map((element, index) => {
          let el = <FeedArticle key={element.id} {...element}/>
          feed.push(el)
        })
        this.setState({articles: feed})
        //console.log(this.state.articles)
        this.setState({currentOffset: this.state.currentOffset+json.data.length})
      }
    })
  }

  loadArticles(limit, offset=this.state.currentOffset) {
    let api_url = api_root+"articles/"
    if(this.state.category)
      api_url += this.state.category
    
    api_url += "?offset="+offset
    api_url += "&limit="+limit
    axios.get(api_url)
    .then(json => {
      if(json.data){
        let feed = []
        json.data.map((element, index) => {
          let el = <FeedArticle {...element}/>;
          feed.push(el)
        })
        this.setState({articles: this.state.articles.concat(feed)})
        //console.log(this.state.articles)
        this.setState({currentOffset: this.state.currentOffset+json.data.length})
      }
    })
  }


  render() {

    return (
      <CSSTransitionGroup
        transitionName="homeTransition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false} 
        transitionLeave={false}
      >
      
        <div className="feed-top">
          {this.state.featured}
        </div>
        <div className="feed-main">
          <p className="feed-main-title">Latest News</p>
          <div id="feed">
          {this.state.articles}
          </div>
          <input type="button" value="Load More" className="loadMore"/>
        </div>
        <div className="feed-side">
          <div className="videos-feed">

          </div>
          <div className="custom-ad">

          </div>
          <FooterHome/>
        </div>
      </CSSTransitionGroup>
    );
  }
}
