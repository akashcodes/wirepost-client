import React, { Component } from 'react';
//import '../stylesheets/page-transition.css';
import { CSSTransitionGroup } from 'react-transition-group'


export class Videos extends Component {
  render() {
    return (
      <CSSTransitionGroup
        transitionName="homeTransition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false} 
        transitionLeave={false}
      >
        <div>
          
        </div>
      </CSSTransitionGroup>
    );
  }
}
