import React from 'react';
import { Spring } from 'react-spring/renderprops';

interface INumberDisplayProps {
  seconds?: number;
  decimalPlaces?: number;
  from: number;
  to: number;
}

export class NumberDisplay extends React.Component<INumberDisplayProps> {

  public render() {
    const {seconds, from ,to, decimalPlaces} = this.props;
    const config = seconds ? {
      duration: seconds * 1000
    } : {};

    return (
      <Spring
        config={config}
        from={{number: from}}
        to={{number: to}}
      >
        {(props) => <div>{props.number.toFixed(decimalPlaces ? decimalPlaces : 1)}</div>}
      </Spring>
    );
  }
}
