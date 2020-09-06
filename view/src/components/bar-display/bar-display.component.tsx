import React from 'react';

import './bar-display.scss';
import { Spring } from 'react-spring/renderprops';
import { NumberDisplay } from '../number/number-display.component';

import './bar-display.scss';

interface IBarDisplayProps {
  data: IBar;
  showNumber?: boolean;
  className?: string;
}
export interface IBar {
  title: string;
  value: number;
}

export class BarDisplay extends React.Component<IBarDisplayProps> {
  public render() {
    const { showNumber = true, data, className = 'bar' } = this.props;
    const {title, value} = data;
    return (
      <div
        key={title}
        className={className}
      >
        {showNumber &&
              <NumberDisplay
                seconds={1}
                from={0}
                decimalPlaces={2}
                to={value}
                unit={'%'}
                className="barNumber"
              />
        }
        <Spring
          config={{
            duration: 1000,
            delay: 200
          }}
          from={{value: 0}}
          to={{value}}
        >
          {(props) =>
            <div className="barContainer" style={{height: `${value*200}px`}}>

              <div className="barGraphic"
                style={{
                  height: `${props.value * 200}px`,
                }}
              />
            </div>
          }
        </Spring>
        <div className="barTitle">
          <span>{title}</span>
        </div>
      </div>
    );
  }
}