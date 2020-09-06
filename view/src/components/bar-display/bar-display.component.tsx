import React from 'react';

import './bar-display.scss';
import { Spring } from 'react-spring/renderprops';
import { NumberDisplay } from '../number/number-display.component';
import { Tooltip, Zoom } from '@material-ui/core';
import './bar-display.scss';

interface IBarDisplayProps {
  data: IBar;
  showNumber?: boolean;
  className?: string;
  tooltip?: React.ReactElement;
}
export interface IBar {
  title: string;
  value: number;
}

export class BarDisplay extends React.Component<IBarDisplayProps> {

  private wrapToolTip(node: React.ReactElement) {
    const { tooltip } = this.props;
    let wrappedNode = node;

    if (tooltip) {
      wrappedNode =
      <Tooltip title={tooltip} placement="right" arrow TransitionComponent={Zoom}>
        {node}
      </Tooltip>;
    }

    return wrappedNode;
  }

  public render() {
    const { showNumber = true, data, className = 'bar' } = this.props;

    console.log('tooltip', data.title);
    const {title, value} = data;
    return (
      <div
        key={title}
        className={className}
      >
        <div className="barNumber">
          {showNumber &&
              <NumberDisplay
                seconds={1}
                from={0}
                decimalPlaces={2}
                to={value}
                unit={'%'}

              />}
        </div>
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
              {this.wrapToolTip(
                <div className="barGraphic"
                  style={{
                    height: `${props.value * 200}px`,
                  }}
                />
              )}
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