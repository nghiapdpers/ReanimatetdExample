import {MultiplePressNative} from './native';
import {MultiplePressableProps, MultiplePressEvent} from './types';
import React from 'react';

export class MultiplePressable extends React.Component<MultiplePressableProps> {
  private _onMultiplePress = (e: MultiplePressEvent) => {
    if (this.props.onMultiplePress) {
      this.props.onMultiplePress(e);
    }
  };

  render() {
    return (
      <MultiplePressNative
        {...this.props}
        onMultiplePress={this._onMultiplePress}
      />
    );
  }
}
