import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import NbaTable from './NbaTable'
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

class App extends Component {

  data = [{"team": "Indiana Pacers", "wins": "35", "loses": "17", "playoff": true}]

  constructor(props) {
    super(props);
    this.setTeamsWest = this.setTeamsWest.bind(this);
    this.setTeamsEast = this.setTeamsEast.bind(this);
    this.getStandings = this.getStandings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
      this.getStandings(this.state.textInput)
      this.setTeamsEast();
  }

  state = {
    midSeason: [],
    endSeason: [],
    currentMidSeason: [],
    currentEndSeason: [],
    textInput: "2000",
    loading: false,
    champTeam: "",
    champMVP: ""
  }

  setTeamsWest() {
    this.setState(state => ({
      currentMidSeason: this.state.midSeason.west,
      currentEndSeason: this.state.endSeason.west
    }));
  }


  setTeamsEast() {
    this.setState(state => ({
      currentMidSeason: this.state.midSeason.east,
      currentEndSeason: this.state.endSeason.east
    }));
  }

  getStandings(year) {
    this.setState({loading: true}, () => {
      axios.get('http://localhost:8000/' + year)
        .then(res => {
          const midSeasonData = res.data.midSeason;
          const endSeasonData = res.data.endSeason;
          const champTeam = res.data.champion.champTeam
          const champMVP = res.data.champion.champMVP
          this.setState(state => ({
            loading: false,
            midSeason: midSeasonData,
            endSeason: endSeasonData,
            champTeam: champTeam,
            champMVP: champMVP        
          })
          )
          this.setTeamsEast()
        })
    })
  }

  handleChange(event) {
    this.setState({textInput: event.target.value});
  }

  handleSubmit(e){
    if(parseInt(this.state.textInput) < 2019 && parseInt(this.state.textInput) > 1980)  {
      this.getStandings(this.state.textInput);
    } else {
      alert("Wrong Year - only 1980 - 2018 is allowed")
    }
    e.preventDefault();
  }

  render() {
    return (
      <div className="App">

        <div>
          <header className="App-header">
            <img src={logo} alt="NBA"/>
              <p>
                NBA to the max
              </p>
            <h5>
              Display NBA standings at the all star break and at the end of season
            </h5>
          </header>
        </div>

        <div
          style={{
            position: 'absolute', left: '20%', top: '160%',
            transform: 'translate(-50%, -50%)'
          }}
        > 
        {this.state.loading ? <LoadingSpinner /> : <NbaTable tableData={this.state.currentMidSeason} />}         
        </div>

        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '15vh'}}>
          <form onSubmit={this.handleSubmit}>
            <label>
            <input type="text" value={this.state.textInput} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>

        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '5vh'}}>
          <button onClick={this.setTeamsWest}>
            West
          </button>
          <button onClick={this.setTeamsEast}>
            East
          </button>
        </div>

        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '5vh'}}>
                {this.state.loading ? <LoadingSpinner /> :  <p>champ : {this.state.champTeam} </p> }
        </div>

        <div>
              {this.state.loading ? <LoadingSpinner /> :  <p> final's MVP : {this.state.champMVP} </p> }
        </div>

        <div
          style={{
            position: 'absolute', left: '80%', top: '160%',
            transform: 'translate(-50%, -50%)'
          }}
        >            
          {this.state.loading ? <LoadingSpinner /> : <NbaTable tableData={this.state.currentEndSeason} />}         
        </div>
      </div>
    );
  }
}

export default App;
