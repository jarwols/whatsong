import React, { Component } from 'react';
import axios from 'axios';
import './App.css'
import config from './config.js'
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch.js'
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
    border: '1px solid #FFFFFF',
    borderRadius: '2rem',
    width: '10rem',
    padding: '0.2em',
    textDecoration: 'none',
    color: 'white'
  },
  title: {
    lineHeight: '32px',
    marginRight: '1rem',
    fontSize: '1rem'
  },
  playBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2rem'
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      track: '',
      artist: '',
      stream_url: '',
      source: 'spotify',
      currently_listening: true,
      tracks: [],
      audio: null,
      playing: false
    }
    this.playSong = this.playSong.bind(this);
  }

  componentWillMount() {
    let url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=jarwols&api_key=' + config.last_fm + '&format=json';
    let _this = this;
    axios({
      method:'get',
      url: url,
      responseType:'stream'
    })
      .then(function(response) {
        let recent_songs = response.data.recenttracks.track;
        let artist = recent_songs[0].artist['#text'];
        let now_playing = false;
        console.log(response.data)
        if(recent_songs[0]['@attr']) now_playing = recent_songs[0]['@attr'].nowplaying;
        _this.setState({
          track: recent_songs[0].name,
          artist: artist,
          currently_listening: now_playing,
          tracks: recent_songs
        });
        _this.discoverTrack(recent_songs[0].name, artist);
      });
  }

  discoverTrack(track, artist) {
    let url = "https://api.spotify.com/v1/search?q=track:" + encodeURIComponent(track) + "%20artist:" + encodeURIComponent(artist) + "&type=track"
    let _this = this;
    axios({
      method:'get',
      url: url,
      responseType:'stream'
    })
      .then(function(response) {
        if(response.data.tracks.total === 0) return;
        if(response.data.tracks.items[0].preview_url) {
          let a = new Audio(response.data.tracks.items[0].preview_url);
          _this.setState({
            stream_url: response.data.tracks.items[0].preview_url,
            audio: a
          });
        }
        _this.setState({
          source: response.data.tracks.items[0].external_urls.spotify
        });
      });
  }

  playSong() {
    if(!this.state.playing) {
      this.state.audio.volume = 0.2;
      this.state.audio.play();
      this.setState({ playing: true });
    } else {
      this.state.audio.pause();
      this.setState({ playing: false });
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
          {this.state.currently_listening ? (
            <h3>I&#39;m listening to:</h3>
          ) : (
            <h3>I was listening to:</h3>
          )}
          <h1>{this.state.track}</h1>
          <h2>{this.state.artist}</h2>
          <div id='playBar' style={styles.playBar}>
            <a target="_blank" href={this.state.source} style={styles.source}>listen on spotify</a>
            {this.state.playing ? (
              <img onClick={this.playSong} src="pause.png"/>
            ) : (
              <img onClick={this.playSong} src="play.png"/>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
