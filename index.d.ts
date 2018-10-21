import * as React from 'react';
import { ImageSourcePropType, StyleProp, TextStyle, ImageStyle, ViewStyle } from 'react-native';
import { SafeAreaViewForceInsetValue } from 'react-navigation';

export interface InnerStyle {
    safeview?: StyleProp<ViewStyle>,
    container?: StyleProp<ViewStyle>,
    seperator?: StyleProp<ViewStyle>,
    title?: StyleProp<TextStyle>,
    titleContainer?: StyleProp<ViewStyle>,
    titleCenterContainer?: StyleProp<ViewStyle>,
    buttonView?: StyleProp<ViewStyle>,
    buttonText?: StyleProp<TextStyle>,
    leftView: StyleProp<ViewStyle>,
    rightView: StyleProp<ViewStyle>,
    gobackView: StyleProp<ViewStyle>,
    gobackImage: StyleProp<ImageStyle>,
}

export type ButtonType = string | React.ReactElement<any>;
export type ButtonsType = ButtonType | ButtonType[];
export type ButtonFuncType = (index: number) => boolean | undefined;

/**
 * Navigation bar height for different device type.
 */
export const NAVBAR_HEIGHT: number;

/**
 * Goback button identifier.
 */
export const GOBACK_BUTTON: ButtonType;

/**
 * Goback button image.
 */
export const GOBACK_IMAGE: ImageSourcePropType;

export interface NaviBarOptionType {
    style: InnerStyle,
    buttonWidth: number,
    gobackImage: ImageSourcePropType,
}

/**
 * Navigation bar global options.
 */
export const NaviBarOptions: NaviBarOptionType;

export type SafeOptionType = {
    top?: SafeAreaViewForceInsetValue;
    bottom?: SafeAreaViewForceInsetValue;
    left?: SafeAreaViewForceInsetValue;
    right?: SafeAreaViewForceInsetValue;
    horizontal?: SafeAreaViewForceInsetValue;
    vertical?: SafeAreaViewForceInsetValue;
};

export interface NaviBarProps {
    title?: string | React.ReactElement<any>,
    titleCenter?: boolean,
    hasSeperatorLine?: boolean,
    leftElement?: ButtonsType,
    rightElement?: ButtonsType,
    onLeft?: ButtonFuncType,
    onRight?: ButtonFuncType,
    autoCloseKeyboard?: boolean,
    autoHardwareBack?: boolean,
    lockEnabled?: boolean,
    safeOptions?: SafeOptionType,
    style?: InnerStyle,
}

export default class NaviBar extends React.PureComponent<NaviBarProps> {
}