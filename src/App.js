import React, { Component } from 'react';
import './App.css'

const styles = {
  App: {
    textAlign: 'center',
    fontSize: '12rem',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  source: {
    fontSize: '1rem',
    border: '2px solid #FFFFFF',
    borderRadius: '2rem',
    width: '50%',
    padding: '0.2em',
    marginTop: '2rem'
  },
  title: {
    lineHeight: '30px',
    marginRight: '1rem'
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: 'Limerance',
      artist: 'Yves Tumor',
      source: 'spotify'
    }
  }

  render() {
    return (
      <div>
        <div id='identifier' style={styles.Jared}>
          <h2 style={styles.title}>Hi, I&#39;m Jared.</h2>
          <img alt="me" src="jared.jpg"/>
        </div>
        <div id='container' style={styles.App}>
          <h3>I&#39;m listening to:</h3>
          <h1>{this.state.track}</h1>
          <h2>{this.state.artist}</h2>
          <div style={styles.source}>{this.state.source}</div>
        </div>
      </div>
    );
  }
}

export default App;
