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
    this.setState({
      runing: true,
    });
      this.started = setInterval(() => this.calculate(), 10)
  }
  
  stop() {
    if(this.state.runing) {
        this.state = {
          runing: false
        }
        clearInterval(this.started);
    }
    else{
      this.state = {
        runing: true
      }
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
  
  pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
  }
  
  format() {
      this.setState({
        minutes: {pad0}(this.state.minutes),
        seconds: {pad0}(this.state.seconds),
        miliseconds: {pad0}(Math.floor(this.state.miliseconds)),
      });
  }
  
  save() {
    this.setState({
      scores: [...this.state.scores, `${this.state.minutes}:${this.state.seconds}:${this.state.miliseconds}`]
    })
  }
  
  render() {
    const scores = this.state.scores.map((score) => {
     return (<li>{score}</li>)
     });
    return(
      
      <div className="container">
        <nav className="controls">
          <button className="button" onClick={this.start.bind(this)}>Start</button>
          <button className="button" onClick={this.stop.bind(this)}>Stop</button>
          <button className="button" onClick={this.reset.bind(this)}>Reset</button>
          <button className="button" onClick={this.save.bind(this)}>Save</button>
          <p>{this.state.minutes}:{this.state.seconds}:{this.state.miliseconds}</p>
          <ul>
            {scores}
          </ul>
        </nav>
      </div>
      
    )
  }
  
}