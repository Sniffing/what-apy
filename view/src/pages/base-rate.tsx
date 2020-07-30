import React from 'react';
import { NumberFade } from '../components/number-display/number-display-fade.component';


export class BaseRatePage extends React.Component {

  public render() {
    return (
      <NumberFade value={'lmao'}/>
    );
  }
}