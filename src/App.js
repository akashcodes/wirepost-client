import React, { Component } from 'react';

import { Header } from "./components/Header"
import { Home } from "./pages/Home"
import { News } from "./pages/News"
import { Videos } from "./pages/Videos"
import './stylesheets/app.css';

import {
  Switch,
  Route
} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" 
            render={(props) => <Home {...props} />}
          />
          <Route path="/videos"  component={Videos} />
          <Route path="/sports" key="sports"
            render={(props) => <Home {...props} category="by/sports" />}
          />
          <Route path="/entertainment" key="entertainment" 
            render={(props) => <Home {...props} category="by/entertainment" />}
          />
          <Route path="/politics" key="politics" 
            render={(props) => <Home {...props} category="by/politics" />}
          />
          <Route path="/technology" key="technology" 
            render={(props) => <Home {...props} category="by/technology" />}
          />
          <Route path="/culture" key="culture"
            render={(props) => <Home {...props} category="by/culture" />}
          />
          <Route path="/world" key="world"
            render={(props) => <Home {...props} category="by/world" />}
          />
          <Route path="/news/:id" key="news"
            render={(props) => <News {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
