import React, { Component } from 'react';
import './App.css';
import Controls from './Components/Controls';
import Comic from './Components/Comic';
import proxiedFetch from 'proxied-fetch';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comicURL: '',
      newest: null
    }
    this.onFirstClick = this.onFirstClick.bind(this);
  }
  onFirstClick() {
    this.setState({comicURL: "https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg"});
  }

  render() {
    return (
      <div>
        <h1>xkcd comics</h1>
        <Controls
          newest={this.state.newest}
          onFirstClick={this.onFirstClick}
        />
        <Comic
          comicURL={this.state.comicURL}
        />
      </div>
    );
  }

  componentDidMount() {
    proxiedFetch("https://xkcd.com/info.0.json")
      .then(response => response.json())
      .then(result => {
        this.setState({comicURL: result.img,
                       newest: result.num})
      })
      .catch(error => console.log(error));
  };
}

export default App;
