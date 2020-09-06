import React from 'react';
import { Spring } from 'react-spring/renderprops';

interface INumberDisplayProps extends React.HTMLAttributes<HTMLDivElement>{
  seconds?: number;
  decimalPlaces?: number;
  from: number;
  to: number;
  unit? : string;
}

export class NumberDisplay extends React.Component<INumberDisplayProps> {

  public render() {
    const {seconds, from ,to, decimalPlaces, unit} = this.props;
    const config = seconds ? {
      duration: seconds * 1000
    } : {};

    return (
      <Spring
        config={config}
        from={{number: from}}
        to={{number: to}}
        {...this.props.className}
      >
        {(props) => <div className={this.props.className}>{`${props.number.toFixed(decimalPlaces ? decimalPlaces : 1)}${unit ?? ''}`}</div>}
      </Spring>
    );
  }
}
