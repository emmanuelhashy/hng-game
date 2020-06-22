/* eslint-disable react/react-in-jsx-scope */
import './style.css';
import React, { Component } from 'react';
import Pusher from 'pusher-js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      computerPick: null,
      result: null,
      leaderboard: [],
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const pusher = new Pusher('6abebfb3e6a1cef0e29c', {
      cluster: 'eu',
      encrypted: true,
    });

    const channel = pusher.subscribe('leaderboard');
    channel.bind('update', data => {
      const { leaderboard } = this.state;
      const userIndex = leaderboard.findIndex(e => e.name === 'Player 1');
      leaderboard[userIndex].score += data.points;

      this.setState({
        computerPick: data.computerPick,
        result: data.points,
        leaderboard,
      });
    });

    fetch('http://localhost:7777/leaderboard')
      .then(response => response.json())
      .then(data => {
        this.setState({
          leaderboard: [...data.players],
        });
      })
      .catch(error => console.log(error));
  }

  handleClick(event) {
    const { value } = event.target;

    fetch(`http://localhost:7777/play?userPick=${value}`)
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  render() {
    const { leaderboard, computerPick, result } = this.state;
    const sortedLeaderboard = leaderboard.sort((a, b) => b.score > a.score);
    const tableBody = sortedLeaderboard.map((player, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{player.name}</td>
        <td>{player.score}</td>
      </tr>
    ));

    const computerPicked = computerPick ?
      <span className="computer-message">The computer chose {computerPick}</span> : null;

    let message;
    if (result !== null) {
      message = result === 1 ?
        <span className="message-content">It's a draw</span> :
        result === 0 ? <span className="message-content fail">You Lost!</span> :
        <span className="message-content success">You won!</span>;
    } else {
      message = null;
    }

    return (
      <div className="App">
        <h1>Rock Paper Scissors</h1>

        <div className="button-row">
          <button onClick={this.handleClick} value="rock" className="rock">Rock</button>
          <button onClick={this.handleClick} value="paper" className="paper">Paper</button>
          <button onClick={this.handleClick} value="scissors" className="scissors">Scissors</button>
        </div>

        <div className="message">
          {message}
          {computerPicked}
        </div>

        <div className="leaderboard">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
