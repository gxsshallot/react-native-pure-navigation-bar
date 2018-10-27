import React from 'react';
import { View, Platform, Text, TouchableOpacity, Image, Keyboard, StyleSheet, BackHandler, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation'
import styles from './style';
import { forceInset, getSafeAreaInset } from './safearea';

export const NAVBAR_HEIGHT = 44;
export const GOBACK_BUTTON = '__gobackbutton__';
export const GOBACK_IMAGE = require('./image/nav_back.png');

export class InnerNaviBar extends React.PureComponent {
    static defaultProps = {
        title: '',
        titleCenter: true,
        hasSeperatorLine: true,
        leftElement: GOBACK_BUTTON,
        rightElement: null,
        autoCloseKeyboard: true,
        autoHardwareBack: true,
        gobackImage: GOBACK_IMAGE,
        safeOptions: forceInset(1, 1, 0, 1),
        style: {},
    };

    constructor(props) {
        super(props);
        this.locks = {};
        this.leftKey = 0;
        this.rightKey = 0;
        this.state = {
            left: null,
            right: null,
        };
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this._clickBack);
        }
        Dimensions.addEventListener('change', this._onWindowChanged);
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this._clickBack);
        }
        Dimensions.removeEventListener('change', this._onWindowChanged);
    }

    render() {
        const {isAbsolute, isTranslucent, safeOptions, hasSeperatorLine} = this.props;
        const seperatorLineStyle = hasSeperatorLine ? this._combineStyle('seperator') : [];
        if (isAbsolute) {
            const safeArea = getSafeAreaInset(undefined, isTranslucent);
            const style = [
                this._combineStyle('absoluteView', {
                    paddingTop: safeArea.top,
                    paddingLeft: safeArea.left,
                    paddingRight: safeArea.right,
                }),
                ...seperatorLineStyle,
            ];
            return (
                <View style={style}>
                    {this._renderView()}
                </View>
            );
        } else if (safeOptions) {
            const safeArea = getSafeAreaInset(undefined, isTranslucent);
            const translucentStyle = {};
            if (Platform.OS === 'android' && safeOptions.top === 'always' && isTranslucent) {
                translucentStyle.paddingTop = StatusBar.currentHeight;
            }
            const style = [
                ...this._combineStyle('safeView', translucentStyle),
                ...seperatorLineStyle,
            ];
            return (
                <SafeAreaView style={style} forceInset={safeOptions}>
                    {this._renderView()}
                </SafeAreaView>
            );
        } else {
            const style = [
                ...this._combineStyle('normalView'),
                ...seperatorLineStyle,
            ]
            return (
                <View style={style}>
                    {this._renderView()}
                </View>
            )
        }
    }

    _renderView = () => {
        const {titleCenter} = this.props;
        let edge;
        if (titleCenter) {
            const noLeft = this.state.left === null;
            const noRight = this.state.right === null;
            if (noLeft || noRight) {
                edge = undefined;
            } else {
                edge = Math.max(this.state.left || 0, this.state.right || 0);
            }
        } else {
            edge = undefined;
        }
        return (
            <View style={this._combineStyle('container', {height: NAVBAR_HEIGHT})}>
                {this._renderButtons('Left', edge)}
                <View style={this._combineStyle('titleContainer')}>
                    {this._renderTitleView()}
                </View>
                {this._renderButtons('Right', edge)}
            </View>
        );
    };

    _renderTitleView = () => {
        const {title} = this.props;
        if (this._canDisplay(title)) {
            return (
                <Text style={this._combineStyle('title')} numberOfLines={1}>
                    {'' + title}
                </Text>
            );
        } else {
            return title;
        }
    };

    _renderButtons = (upperType, edge) => {
        const lowerType = upperType.toLowerCase();
        const elementProps = this.props[lowerType + 'Element'];
        if (this[lowerType] !== elementProps) {
            this[lowerType] = elementProps;
            this[lowerType + 'Key'] += 1;
        }
        let element = [];
        if (elementProps) {
            element = Array.isArray(elementProps) ? elementProps : [elementProps]
        }
        const viewStyleKey = lowerType + 'View';
        return (
            <View
                key={lowerType + this[lowerType + 'Key']}
                onLayout={this._onButtonsLayoutChanged.bind(this, lowerType)}
                style={this._combineStyle(viewStyleKey, {minWidth: edge})}
            >
                {element.map(this._renderButton.bind(this, upperType))}
            </View>
        );
    };

    _renderButton = (upperType, item, index) => {
        const func = this._clickButton.bind(this, upperType, item, index);
        const specStyle = {
            height: NAVBAR_HEIGHT,
        };
        const button = item === GOBACK_BUTTON ? (
            <View style={this._combineStyle('gobackView', specStyle)}>
                <Image
                    source={this.props.gobackImage}
                    style={this._combineStyle('gobackImage')}
                />
                {this.props.gobackText !== undefined && (
                    <Text
                        style={this._combineStyle('gobackText')}
                        numberOfLines={1}
                    >
                        {'' + this.props.gobackText}
                    </Text>
                )}
            </View>
        ) : (
            <View style={this._combineStyle('buttonView', specStyle)}>
                {this._canDisplay(item) ? (
                    <Text style={this._combineStyle('buttonText')}>
                        {'' + item}
                    </Text>
                ) : item}
            </View>
        );
        return (
            <TouchableOpacity key={index} onPress={func}>
                {button}
            </TouchableOpacity>
        );
    };

    _onButtonsLayoutChanged = (lowerType, {nativeEvent: {layout: {width}}}) => {
        this.setState({
            [lowerType]: width
        });
    };

    _onWindowChanged = () => {
        this.props.isAbsolute && this.forceUpdate();
    };

    _clickButton = (upperType, item, index) => {
        const lockKey = upperType + index;
        if (!this.props.disableLock) {
            if (this.locks[lockKey]) {
                return;
            }
            this.locks[lockKey] = true;
        }
        this.props.autoCloseKeyboard && Keyboard.dismiss();
        const clickKey = 'on' + upperType;
        const doDefaultAction = this.props[clickKey] && this.props[clickKey](index);
        if (item === GOBACK_BUTTON && doDefaultAction !== false) {
            this.props.navigation && this.props.navigation.goBack();
        }
        if (!this.props.disableLock) {
            this.locks[lockKey] = false;
        }
    };

    _clickBack = () => {
        const {leftElement, rightElement} = this.props;
        const lefts = Array.isArray(leftElement) ? leftElement : [leftElement];
        const rights = Array.isArray(rightElement) ? rightElement : [rightElement];
        const index = [...lefts, ...rights].findIndex(item => item === GOBACK_BUTTON);
        if (index >= 0) {
            let innerIndex, upperType;
            if (index < lefts.length) {
                upperType = 'Left';
                innerIndex = index;
            } else {
                upperType = 'Right';
                innerIndex = index - lefts.length;
            }
            this._clickButton(upperType, element[index], innerIndex);
        }
        return true;
    };

    _combineStyle = (key, innerStyle = undefined) => {
        const style = Array.isArray(innerStyle) ? innerStyle : [innerStyle];
        return [styles[key], ...style, this.props.style[key]];
    };

    _canDisplay = (item) => typeof item === 'string' || typeof item === 'number';
}

export default withNavigation(InnerNaviBar);