
import React from 'react';
import { Transition, animated } from 'react-spring/renderprops';

interface IProps {
  value: string | number;
}

export class NumberFade extends React.Component<IProps> {
  state = { show: true }

  public render() {
    return (
        <Transition
          items={this.props.value}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
          >
          {(num => props => <animated.div style={props}>{num}</animated.div>)
          }
        </Transition>
    );
  }
}