import './App.css';
import React from "react";
import lottery from "./lottery";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {manager: ''};
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    this.setState({manager});
  }

  render() {
    return (
        <div>
          <h1>Lottery Contract</h1>
          <p>This contract is <strong>managed by</strong>: {this.state.manager}</p>
        </div>
    );
  }
}

export default App;
