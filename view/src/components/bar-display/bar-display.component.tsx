import React from 'react';

import './bar-display.scss';
import { Tooltip } from 'antd';
import { Spring } from 'react-spring/renderprops';
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
        <Tooltip
          title={tooltip}
          placement="right"
        >
          {node}
        </Tooltip>;
    }

    return wrappedNode;
  }

  public render() {
    const { showNumber = true, data, className = 'bar' } = this.props;
    const { title, value } = data;
    return (
      <div
        key={title}
        className={className}
      >
        <Spring
          config={{
            duration: 700,
            delay: 200
          }}
          from={{ barValue: 0, textValue: 0 }}
          to={{ barValue: value, textValue: value }}
        >
          {({ barValue, textValue }) =>
            <div className="barContainer">
              {this.wrapToolTip(
                <svg width="60" height="100%">
                  <g>
                  {showNumber && (
                    <text
                      y={`${100 - (barValue*92/value)}%`}
                      x="10"
                      fontSize="16"
                      fill="white"
                    >
                      {`${textValue.toFixed(2)}%`}
                    </text>
                  )}
                  <rect
                    width="60"
                    y={`${100 - (barValue / value) * 90}%`}
                    height={`${(barValue / value) * 90}%`}
                    className="barGraphic" />
                  </g>
                </svg>
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