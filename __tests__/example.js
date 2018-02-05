import 'react-native';
import React from 'react';
import {Example} from '../example/example';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <Example />
    );
});