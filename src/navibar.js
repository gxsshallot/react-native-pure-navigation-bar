import React from 'react';
import { View, Platform, Text, TouchableOpacity, Image, Keyboard, StyleSheet, BackHandler, Dimensions, StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation'
import styles from './style';
import { forceInset, getSafeAreaInset } from './safearea';

export const DEFAULT_NAVBAR_HEIGHT = 44;
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
        navbarHeight: DEFAULT_NAVBAR_HEIGHT,
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
        BackHandler.addEventListener('hardwareBackPress', this._clickBack);
        Dimensions.addEventListener('change', this._onWindowChanged);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._clickBack);
        Dimensions.removeEventListener('change', this._onWindowChanged);
    }

    render() {
        const {isAbsolute, isTranslucent, safeOptions, hasSeperatorLine} = this.props;
        const seperatorLineStyle = hasSeperatorLine ? this._combineStyle('seperator') : [];
        let style
        if (isAbsolute) {
            const safeArea = getSafeAreaInset(undefined, isTranslucent);
            style = [
                this._combineStyle('absoluteView', {
                    paddingTop: safeArea.top,
                    paddingLeft: safeArea.left,
                    paddingRight: safeArea.right,
                }),
                ...seperatorLineStyle,
            ];
        } else if (safeOptions) {
            const safeArea = getSafeAreaInset(undefined, isTranslucent);
            const func = (pos) => safeOptions[pos] === 'always' ? safeArea[pos] : undefined;
            style = [
                ...this._combineStyle('safeView', {
                    paddingTop: func('top'),
                    paddingLeft: func('left'),
                    paddingRight: func('right'),
                    paddingBottom: func('bottom'),
                    height: func('top') + this.props.navbarHeight,
                }),
                ...seperatorLineStyle,
            ];
        } else {
            style = [
                ...this._combineStyle('normalView'),
                ...seperatorLineStyle,
            ]
        }
        return (
            <View style={style}>
                {this._renderView()}
            </View>
        )
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
            <View style={this._combineStyle('container', {height: this.props.navbarHeight})}>
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
            height: this.props.navbarHeight,
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
        this.forceUpdate();
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
            if (index < lefts.length) {
                this._clickButton('Left', lefts[index], index);
            } else {
                this._clickButton('Right', rights[index - lefts.length], index - lefts.length);
            }
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
