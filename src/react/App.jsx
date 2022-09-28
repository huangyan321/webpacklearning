import React, { Component } from 'react';
import '*css/hello-less.less'
class App extends Component {
  constructor(props) {
    super(props),
      (this.state = {
        message: 'hello react',
      });
  }
  reverse() {
    this.setState(preState => ({
      message: preState.message.split('').reverse().join(''),
    }));
  }
  render() {
    const { message } = this.state;
    return (
      <div>
        <h2>{message}</h2>
        <button
          onClick={() => {
            this.reverse();
          }}
        >
          反转
        </button>
      </div>
    );
  }
}
export default App;
