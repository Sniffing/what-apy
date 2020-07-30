
import React from 'react';
import { Transition, animated } from 'react-spring/renderprops';

interface IProps {
  value: string | number;
}

interface IState {
  show: boolean;
}

export class NumberFade extends React.Component<IProps, IState> {
  state = { show: true }

  private toggle = () => {
    this.setState((prevState: IState) => ({
      show: !prevState.show
    }));
  }

  public render() {
    return (
      <div style={{backgroundColor: 'red', width: '100px', height: '100px'}}onClick={this.toggle}>
        <Transition
          native
          items={this.state.show}
          from={{ position: 'absolute', overflow: 'hidden', height: 0 }}
          enter={[{ height: 'auto' }]}
          leave={{ height: 0 }}>
          {show =>
            show && (props => <animated.div style={props}>{this.props.value}</animated.div>)
          }
        </Transition>
      </div>
    );
  }
}