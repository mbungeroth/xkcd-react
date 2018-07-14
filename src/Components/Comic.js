import React, { Component } from 'react';
import proxiedFetch from 'proxied-fetch';

class Comic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comicURL: '',
      newest: null
    }
  }

  render() {
    return (
      <div>
        <img src={this.state.comicURL} alt="comic here"/>
      </div>
    )
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


export default Comic;
