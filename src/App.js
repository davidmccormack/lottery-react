import './App.css';
import React from "react";
import web3 from "./web3"
import lottery from "./lottery";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {manager: '', players: [], balance: '', address: '', value: ''};
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const address = lottery.options.address;
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address); // returns wey not ether.
    this.setState({manager, players, balance, address});
  }

  render() {
      const {manager, players, balance, address, value} = this.state;
      const UNIT = "ether";
      return (
            <div>
                 <h1>Lottery Contract</h1>
                <p>This contract is <strong>managed by</strong>: {manager}</p>
                <p>This contract is <strong> deployed to</strong>: {address}</p>

                <div>
                    <p>This contract currently contains {players.length} entries.</p>
                    <p>The balance on the contract is: {web3.utils.fromWei(balance, UNIT)} ETH</p>
                </div>


                <div>
                    <form>
                        <h2>You should enter</h2>
                        <label>Amount of ether to enter: </label>
                        <input
                            value = {value}
                            onChange={(event) => {
                                this.setState({value: event.target.value})
                        }}/>
                        <button>Enter</button>

                    </form>
                </div>
            </div>

        );
  }
}

export default App;
