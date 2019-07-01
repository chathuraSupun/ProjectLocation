import React from 'react';
import { View, } from 'react-native';
import { ScaleUnits } from '../config';

const { scale } = ScaleUnits;

const Divider = ({ dividerColor }) => (
  <View style={{ borderBottomColor: dividerColor, borderBottomWidth: scale(0.7), }} />
);

export { Divider };
