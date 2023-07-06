import React from 'react';
import {NativeSpinner} from './native';
import {SpinnerProps} from './type';

export default class Spinner extends React.Component<SpinnerProps> {
  render(): React.ReactNode {
    return <NativeSpinner {...this.props} />;
  }
}
