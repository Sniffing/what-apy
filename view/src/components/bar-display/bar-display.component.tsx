import React from 'react';

import './bar-display.scss';
import { Spring } from 'react-spring/renderprops';
import { NumberDisplay } from '../number-display/number-display.component';


interface IBarDisplayProps {
  data: IBar[];
  showNumber?: boolean;
}
interface IBar {
  title: string;
  value: number;
}

export class BarDisplay extends React.Component<IBarDisplayProps> {

  public render() {
    return (
      <div className="barDisplay" >
        {this.props.data.map(({title, value}, index: number) => (
          <>
            <div
              key={title}
              className="bar"
            >
              {this.props.showNumber &&
              <NumberDisplay
                seconds={1}
                from={0}
                decimalPlaces={2}
                to={value}
              />
              }
              <Spring
                config={{
                  duration: 1000,
                  delay: 200 * index
                }}
                from={{value: 0}}
                to={{value}}
              >
                {(props) =>
                  <div className="barContainer">
                    <div className="barGraphic"
                      style={{
                        height: `${props.value * 300}px`,
                      }}
                    />
                  </div>
                }
              </Spring>
              <div className="barTitle">
                {title}
              </div>
            </div>
          </>
        ))}

      </div>
    );
  }
}