import 'react-native';
import React from 'react';
import {App} from '../example';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <App />
  );
});