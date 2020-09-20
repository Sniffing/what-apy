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
  relativeHeight?: number;
}
export interface IBar {
  title: string;
  value: number;
  link?: string;
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
    const { showNumber = true, data, className = 'bar', relativeHeight = 100 } = this.props;
    const { title, value, link } = data;
    return (
      <div
        key={title}
        className={className}
      >
        <Spring
          config={{
            duration: 550,
            delay: 200
          }}
          from={{ barValue: 0, textValue: 0 }}
          to={{ barValue: value, textValue: value }}
        >
          {({ barValue, textValue }) => {
            const heightPercentage = barValue*relativeHeight/value;
            return <div className="barContainer">
              {this.wrapToolTip(
                <svg width="60" height="100%">
                  <g>
                    {showNumber && (
                        <text
                          y={`${100 - heightPercentage}%`}
                          x="6"
                          transform="translate(0,15)"
                          fontSize="16"
                          fill="white"
                        >
                          {`${textValue.toFixed(2)}%`}
                        </text>
                    )}
                    <rect
                      width="60"
                      y={`calc(${100 - heightPercentage}% + 20px)`}
                      height={`calc(${heightPercentage}% - 20px)`}
                      className="barGraphic" />
                  </g>
                </svg>
              )}
            </div>
          }}
        </Spring>
        <a href={link} target="_blank">
          <div className="barTitle">
            <span>{title}</span>
          </div>
        </a>
      </div>
    );
  }
}