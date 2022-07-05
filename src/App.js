import './App.css';
import React from "react";
import web3 from "./web3"
import lottery from "./lottery";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        manager: '',
        players: [],
        balance: '',
        address: '',
        value: '',
        waiting: false,
    };
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const address = lottery.options.address;
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address); // returns wei not ether.
    this.setState({manager, players, balance, address});
  }

  onSubmit = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      console.log(accounts)

      this.setState({waiting: true})

      const unit = "ether";
      await lottery.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.value, unit),
      })

      this.setState({waiting: false})
  }

  render() {
      const {manager, players, balance, address, value} = this.state;
      const UNIT = "ether";
      return (
            <div>
                 <h1>Lottery Contract</h1>
                <p>This contract is <strong>managed by</strong>: {manager}</p>
                <p>This contract is <strong> deployed to</strong>: {address}</p>

                <hr/>

                <div>
                    <p>This contract currently contains {players.length} entries.</p>
                    <p>The balance on the contract is: {web3.utils.fromWei(balance, UNIT)} ETH</p>
                </div>

                <hr/>

                <div>
                    <form>
                        <h2>You should enter!</h2>
                        <label>Amount of ether to enter: </label>
                        <input
                            value = {value}
                            onChange={(event) => {
                                const unit = 'ether';
                                this.setState({value: event.target.value,unit})
                        }}/>
                        <button onClick={this.onSubmit}>Enter</button>
                    </form>

                    {this.state.waiting && <h1>Validating transaction...</h1>}

                </div>
            </div>

        );
  }
}

export default App;
