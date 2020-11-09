import { Col, Row } from 'antd';
import React from 'react';

import './site-footer.scss';

export class SiteFooter extends React.Component {


  public render() {
    return (
      <Row gutter={40} className="footer">
        <Col span={8}>
        </Col>
        <Col span={8}>
          <div>@tserence</div>
        </Col>
        <Col span={8}>
          <div>
            <a href="https://github.com/sniffing" target="_blank" rel="noopener noreferrer">github </a>
          </div>
        </Col>
      </Row>
    );
  }
}