import React from 'react';

import './bar-display.scss';
import { Tooltip, Button } from 'antd';
import { Spring } from 'react-spring/renderprops';
import './bar-display.scss';
import { inject } from 'mobx-react';
import { createLinkClickEvent, TrackingStore } from '../../stores/TrackingStore';

interface IBarDisplayProps {
  data: IBar;
  showNumber?: boolean;
  className?: string;
  tooltip?: React.ReactElement;
  relativeHeight?: number;
  trackingStore?: TrackingStore;
}
export interface IBar {
  title: string;
  value: number;
  link?: string;
}

@inject('trackingStore')
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

  private handleLinkClick = () => {
    if (!this.props.data.link) {
      return;
    }

    this.props.trackingStore?.trackEvent(createLinkClickEvent('Bar graph link click'));

    this.props.trackingStore?.trackNavigateAway({
      description: `Navigate to ${this.props.data.title} website`,
      url: this.props.data.link
    });

    window.open(this.props.data.link, '_blank');
  }

  public render() {
    const { showNumber = true, data, className = 'bar', relativeHeight = 100 } = this.props;
    const { title, value } = data;
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
                        fill="black"
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
            </div>;
          }}
        </Spring>
        <Button type="link" onClick={this.handleLinkClick}>
          <div className="barTitle">
            {title}
          </div>
        </Button>
      </div>
    );
  }
}