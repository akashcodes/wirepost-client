import React, { Component } from 'react';

//import '../stylesheets/page-transition.css';
import { CSSTransitionGroup } from 'react-transition-group'
import axios from 'axios'

import "../stylesheets/news.css"

const api_root = "http://0.0.0.0:8000/api/"


var NewsData = (props) => {
  return(
    <div className="news">
      <div className="banner">
        <img className="image" src={props.banner} />
        <div className="gradient"></div>
        <div className="title">
          <p>{props.title}</p>
        </div>
        <p className="date">{"Published on: "+props.creation_date.split("T")[0]+" in"}<span style={{
          color: props.color,
        }}>&nbsp;&nbsp;{props.category}</span></p>
      </div>
      <div className="content">
        <p dangerouslySetInnerHTML={{__html:props.content}}></p>
      </div>
    </div>
  )
}

export class News extends Component {

  constructor(props) {
    super(props)
    this.state = {
      article: undefined,
      id: this.props.match.params.id
    }
  }

  componentDidMount() {
    let api_url = api_root+"article/"+this.state.id
    
    axios.get(api_url)
    .then(json => {
      if(json.data) {
        let news = <NewsData {...json.data[0]} />
        this.setState({article: news})
        console.log(json.data[0])
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
      {this.state.article}
      
      </CSSTransitionGroup>
    );
  }
}
