  function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

class Stoper extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0,
      runing: false,
      scores: [],
    }
  }
  
  calculate() {
    this.setState({miliseconds: this.state.miliseconds + 1});
    if(this.state.miliseconds >= 100) {
      this.setState({
        seconds: this.state.seconds += 1,
        miliseconds: this.state.miliseconds = 0,
      });
    }
    else if(this.state.seconds >= 60) {
      this.setState({
        minutes: this.state.minutes += 1,
        seconds: this.state.seconds = 0,
      });
    }
  }
  
  start() {
    if (!this.running) {
        this.setState({
          runing: true,
        });
        this.started = setInterval(() => this.calculate(), 10)}
  }
  
  stop() {
    if(this.state.runing) {
        this.setState ({
          runing: false
        });
        clearInterval(this.started);
    }
  }
  
  reset() {
    if(!this.state.runing) {
        this.setState({
          minutes: 0,
          seconds: 0,
          miliseconds: 0,
          runing: false,
          scores: [],
      });
    }
  }


  format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }

  
  save() {
    this.setState({
      scores: [...this.state.scores, this.format(this.state)]
    })
  }
  
  render() {
    const scores = this.state.scores.map((score) => {
     return (<li key={score.toString()}>{score}</li>)
     });
    return(
      
      <div className="container">
        <nav className="controls">
          <a href="#" className="button" onClick={this.start.bind(this)}>Start</a>
          <a href="#" className="button" onClick={this.stop.bind(this)}>Stop</a>
          <a href="#" className="button" onClick={this.reset.bind(this)}>Reset</a>
          <a href="#" className="button" onClick={this.save.bind(this)}>Save</a>
          <div className="stopwatch">{this.format(this.state) }</div>
          <ul className="results">
            {scores}
          </ul>
        </nav>
      </div>
      
    )
  }
  
}

ReactDOM.render(
  <Stoper />, 
  document.getElementById("app")
);
