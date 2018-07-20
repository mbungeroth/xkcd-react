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
      alt: '',
      newestComic: false,
      firstComic: false,
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
          alt: result.alt,
          newestComic: result.num === this.state.newest,
          firstComic: result.num === 1,
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    const {
      comicURL,
      current,
      title,
      alt,
      newestComic,
      firstComic,
    } = this.state;
    return (
      <div className="container">
        <h1>xkcd comics</h1>
        <div className="controls-comics">
          <Controls
            handleClick={this.handleClick}
            isNewest={newestComic}
            isFirst={firstComic}
          />
          <Comic
            comicURL={comicURL}
            title={title}
            comicNumber={current}
            alt={alt}
          />
          <Controls
            handleClick={this.handleClick}
            isNewest={newestComic}
            isFirst={firstComic}
          />
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
          alt: result.alt,
          newestComic: true,
        });
      })
      .catch(error => console.log(error));
  }
}

export default App;
