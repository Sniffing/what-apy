import { Col, Row } from 'antd';
import React from 'react';

import './site-footer.scss';

export class SiteFooter extends React.Component {


  public render() {
    return (
      <Row gutter={16} className="footer">
        <Col span={8}>
        </Col>
        <Col span={8}>
          <span style={{height: '100%'}}>@tserence</span>
        </Col>
        <Col span={8}>
            <a style={{height: '100%'}} href="https://github.com/sniffing" target="_blank" rel="noopener noreferrer">github </a>
        </Col>
      </Row>
    );
  }
}