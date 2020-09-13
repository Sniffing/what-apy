
import React, { CSSProperties } from 'react';
import { Transition, animated } from 'react-spring/renderprops';

interface IProps {
  value: string | number;
  seconds?: number;
  style?: CSSProperties;
}

export class NumberFade extends React.Component<IProps> {
  state = { show: true }

  public render() {
    const { seconds } = this.props;
    return (
      <Transition
        items={this.props.value}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
        config={{
          duration: (seconds ?? 1) * 1000
        }}
      >
        {(num => props =>
          <animated.div style={{ ...props, ...this.props.style }}>{num}</animated.div>)
        }
      </Transition>
    );
  }
}