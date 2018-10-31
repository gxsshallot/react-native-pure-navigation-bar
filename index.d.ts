import * as React from 'react';
import { ImageSourcePropType, StyleProp, TextStyle, ImageStyle, ViewStyle } from 'react-native';
import { SafeAreaViewForceInsetValue } from 'react-navigation';

export const DEFAULT_NAVBAR_HEIGHT: number;
export const GOBACK_BUTTON: string;
export const GOBACK_IMAGE: ImageSourcePropType;

interface SafeOptionsType {
    top: SafeAreaViewForceInsetValue;
    left: SafeAreaViewForceInsetValue;
    bottom: SafeAreaViewForceInsetValue;
    right: SafeAreaViewForceInsetValue;
}

interface SafeAreaInset {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export function getSafeAreaInset(isLandscape?: boolean): SafeAreaInset;
export function forceInset(top: number, right: number, bottom: number, left: number): SafeOptionsType;

interface InnerStyle {
    safeView?: StyleProp<ViewStyle>;
    absoluteView?: StyleProp<ViewStyle>;
    normalView?: StyleProp<ViewStyle>;
    container?: StyleProp<ViewStyle>;
    seperator?: StyleProp<ViewStyle>;
    titleContainer?: StyleProp<ViewStyle>;
    title?: StyleProp<TextStyle>;
    leftView?: StyleProp<ViewStyle>;
    rightView?: StyleProp<ViewStyle>;
    buttonView?: StyleProp<ViewStyle>;
    buttonText?: StyleProp<TextStyle>;
    gobackView?: StyleProp<ViewStyle>;
    gobackImage?: StyleProp<ImageStyle>;
    gobackText?: StyleProp<TextStyle>;
}

export interface NaviBarProps {
    title?: string | number | React.ReactElement;
    titleCenter?: boolean;
    hasSeperatorLine?: boolean;
    leftElement?: string | number | React.ReactElement | Array<string | number | React.ReactElement>;
    rightElement?: string | number | React.ReactElement | Array<string | number | React.ReactElement>;
    onLeft?: (index: number) => boolean | void;
    onRight?: (index: number) => boolean | void;
    autoCloseKeyboard?: boolean;
    autoHardwareBack?: boolean;
    disableLock?: boolean;
    gobackImage?: ImageSourcePropType;
    gobackText?: string;
    isAbsolute?: boolean;
    isTranslucent?: boolean;
    safeOptions?: SafeOptionsType;
    navbarHeight?: number;
    style?: InnerStyle;
}

export class InnerNaviBar extends React.PureComponent<NaviBarProps> {};
export default class NaviBar extends React.PureComponent<NaviBarProps> {};