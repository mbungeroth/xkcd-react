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
      title: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(button) {
    if (button === 'first') {
      this.setState({
        comicURL: 'https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg',
      });
    } else if (button === 'previous') {
      proxiedFetch(`${PATH_BASE}${this.state.current - 1}${PATH_END}`)
        .then(response => response.json())
        .then(result => {
          this.setState({
            comicURL: result.img,
            current: result.num,
            title: result.title
          });
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    return (
      <div>
        <h1>xkcd comics</h1>
        <Controls newest={this.state.newest} handleClick={this.handleClick} />
        <Comic comicURL={this.state.comicURL} />
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
          title: result.title
        });
      })
      .catch(error => console.log(error));
  }
}

export default App;
