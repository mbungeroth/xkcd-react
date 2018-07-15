import React, { Component } from 'react';
import './App.css';
import Controls from './Components/Controls';
import Comic from './Components/Comic';
import proxiedFetch from 'proxied-fetch';

const PATH_BASE = 'https://xkcd.com/';
const PATH_END = '/info.0.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comicURL: '',
      newest: null,
      current: null,
      title: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(button) {
    if (button === 'first') {
      this.processComicFetch(`${PATH_BASE}1${PATH_END}`);
    } else if (button === 'previous') {
      this.processComicFetch(
        `${PATH_BASE}${this.state.current - 1}${PATH_END}`
      );
    } else if (button === 'next') {
      this.processComicFetch(
        `${PATH_BASE}${this.state.current + 1}${PATH_END}`
      );
    } else if (button === 'last') {
      this.processComicFetch(`${PATH_BASE}${this.state.newest}${PATH_END}`);
    } else if (button === 'random') {
      let randomID = Math.floor(
        Math.random() * Math.floor(this.state.newest + 1)
      );
      this.processComicFetch(`${PATH_BASE}${randomID}${PATH_END}`);
    }
  }

  processComicFetch(url) {
    proxiedFetch(url)
      .then(response => response.json())
      .then(result => {
        this.setState({
          comicURL: result.img,
          current: result.num,
          title: result.title,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="container">
        <h1>xkcd comics</h1>
          <div className="controls-comics">
            <Controls
              newest={this.state.newest}
              handleClick={this.handleClick}
            />
            <Comic
              comicURL={this.state.comicURL}
              title={this.state.title}
              comicNumber={this.state.current}
            />
            <div className="button-controls">
              <Controls
                newest={this.state.newest}
                handleClick={this.handleClick}
              />
            </div>
          </div>
        <h6>All comics courtesy of xkcd.com</h6>
      </div>
    );
  }

  componentDidMount() {
    proxiedFetch('https://xkcd.com/info.0.json')
      .then(response => response.json())
      .then(result => {
        this.setState({
          comicURL: result.img,
          newest: result.num,
          current: result.num,
          title: result.title,
        });
      })
      .catch(error => console.log(error));
  }
}

export default App;
