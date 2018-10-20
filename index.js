import React from 'react';
import {View, Text, TouchableOpacity, Image, Keyboard, StyleSheet, BackHandler, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

/**
 * Navigation bar height for different device type.
 * @type {number}
 */
export const NAVBAR_HEIGHT = 44;

/**
 * Goback button identifier.
 * @type {string}
 */
export const GOBACK_BUTTON = '__gobackbutton__';

/**
 * Goback button image.
 * @type {number}
 */
export const GOBACK_IMAGE = require('./image/nav_back.png');

/**
 * Set global custom style.
 * @param key a string which is also a key of 'styles' object below
 * @param style an object to override the default style
 */
export const setCustomStyle = (key, style) => {
    if (styles[key]) {
        custom.style[key] = style;
    } else {
        console.error('Navigation bar global style key must be one of [ ' + Object.keys(styles).join(' ') + ' ]');
    }
};

/**
 * Set global goback function.
 * So you donot need to pass 'navigation' property each time.
 * @param func a function without any params
 */
export const setGlobalGobackFunc = (func) => {
    custom.gobackFunc = func;
};

/**
 * Set global goback image.
 * @param image a local image of url
 */
export const setGlobalGobackImage = (image) => {
    if (typeof image === 'number') {
        custom.gobackImage = image;
    } else if (typeof image === 'string') {
        custom.gobackImage = {uri: image};
    } else {
        console.error('Global goback image is wrong');
    }
};

const custom = {
    style: {},
    gobackImage: GOBACK_IMAGE,
    gobackFunc: null,
};

export default class extends React.PureComponent {
    static propTypes = {
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        titleCenter: PropTypes.bool,
        hasSeperatorLine: PropTypes.bool,
        leftElement: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.array
        ]),
        rightElement: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element,
            PropTypes.array
        ]),
        onLeft: PropTypes.func,
        onRight: PropTypes.func,
        autoCloseKeyboard: PropTypes.bool,
        autoHardwareBack: PropTypes.bool,
        navigation: PropTypes.object,
        lockEnabled: PropTypes.bool,
        safeOptions: PropTypes.object,
        style: PropTypes.any,
    };

    static defaultProps = {
        title: '',
        titleCenter: true,
        hasSeperatorLine: true,
        leftElement: GOBACK_BUTTON,
        rightElement: null,
        autoCloseKeyboard: true,
        autoHardwareBack: true,
        navigation: null,
        lockEnabled: true,
        safeOptions: {
            top: 'always',
            left: 'always',
            right: 'always',
            bottom: 'never',
        },
        style: {},
    };

    constructor(props) {
        super(props);
        this.locks = {};
        this.state = {
            Left: 0,
            Right: 0,
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._clickBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._clickBack);
    }

    _clickBack = () => {
        const search = (type) => {
            const lowerType = type.toLowerCase();
            const elementKey = lowerType + 'Element';
            let element = this.props[elementKey];
            if (!Array.isArray(element)) {
                element = [element];
            }
            const index = element.findIndex(item => item === GOBACK_BUTTON);
            if (index >= 0) {
                this._clickButton(type, element[index], index);
                return true;
            } else {
                return false;
            }
        };
        search('Left') || search('Right');
        return true;
    };

    _combineStyle = (key, innerStyle = undefined) => {
        const style = Array.isArray(innerStyle) ? innerStyle : [innerStyle];
        return [styles[key], ...style, custom.style[key], this.props.style[key]];
    };

    _clickButton = (clicktype, identifier, index) => {
        const lockKey = clicktype + index;
        const lockEnabled = this.props.lockEnabled;
        if (lockEnabled && this.locks[lockKey]) {
            return;
        }
        if (lockEnabled) {
            this.locks[lockKey] = true;
        }
        // Dismiss Keyboard
        this.props.autoCloseKeyboard && Keyboard.dismiss();
        // General Button, use 'onLeft' or 'onRight' in this.props
        const clickKey = 'on' + clicktype;
        const doDefaultAction = this.props[clickKey] && this.props[clickKey](index);
        // Goback Button, use global action or navigation's goBack
        if (identifier === GOBACK_BUTTON && doDefaultAction !== false) {
            if (this.props.navigation) {
                this.props.navigation.goBack();
            } else {
                custom.gobackFunc && custom.gobackFunc();
            }
        }
        if (lockEnabled) {
            this.locks[lockKey] = false;
        }
    };

    _renderButton = (type, item, index) => {
        const func = this._clickButton.bind(this, type, item, index);
        const specStyle = {marginHorizontal: 5, ['margin' + type]: 0};
        const buttonViewStyle = this._combineStyle('buttonView', specStyle);
        if (item === GOBACK_BUTTON) {
            return (
                <TouchableOpacity key={index} onPress={func} style={this._combineStyle('gobackView', specStyle)}>
                    <Image
                        source={custom.gobackImage}
                        style={this._combineStyle('gobackImage')}
                    />
                </TouchableOpacity>
            );
        } else if (typeof item === 'string') {
            return (
                <TouchableOpacity key={index} onPress={func} style={buttonViewStyle}>
                    <Text style={this._combineStyle('buttonText')}>
                        {item}
                    </Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity key={index} onPress={func} style={buttonViewStyle}>
                    {item}
                </TouchableOpacity>
            );
        }
    };

    _renderButtons = (type) => {
        const lowerType = type.toLowerCase();
        const elementKey = lowerType + 'Element';
        let element = this.props[elementKey];
        if (!Array.isArray(element)) {
            element = [element];
        }
        let extra;
        const viewStyleKey = lowerType + 'View';
        if (type === 'Left') {
            extra = element.length > 0 && element[0] === GOBACK_BUTTON ? 0 : 8;
        } else {
            extra = element.length > 0 && element[element.length - 1] === GOBACK_BUTTON ? 0 : 8;
        }
        return (
            <View
                onLayout={e => this.setState({[type]: e.nativeEvent.layout.width})}
                style={this._combineStyle(viewStyleKey, {['padding' + type]: extra})}
            >
                {element.map(this._renderButton.bind(this, type))}
            </View>
        );
    };

    _renderTitleView = () => {
        const {title} = this.props;
        if (typeof title === 'string') {
            return (
                <Text numberOfLines={1} style={this._combineStyle('title')}>
                    {title}
                </Text>
            );
        } else {
            return title;
        }
    };

    _renderView = () => {
        const {titleCenter, hasSeperatorLine} = this.props;
        const edge = Math.max(this.state.Left, this.state.Right) + 15;
        const maxWidthCenterStyle = titleCenter
            ? {left: edge, right: edge}
            : {};
        const seperatorLineStyle = hasSeperatorLine ? this._combineStyle('seperator') : {};
        return (
            <View style={this._combineStyle('container', seperatorLineStyle)}>
                {this._renderButtons('Left')}
                {!titleCenter ? (
                    <View style={this._combineStyle('titleContainer')}>
                        {this._renderTitleView()}
                    </View>
                ) : (
                    <View style={this._combineStyle('titleCenterContainer', maxWidthCenterStyle)}>
                        {this._renderTitleView()}
                    </View>
                )}
                {this._renderButtons('Right')}
            </View>
        );
    };

    render() {
        const {safeOptions} = this.props;
        if (safeOptions) {
            return (
                <SafeAreaView
                    style={this._combineStyle('safeview')}
                    forceInset={safeOptions}
                >
                    {this._renderView()}
                </SafeAreaView>
            );
        } else {
            return this._renderView();
        }
    }
}

const minWidth = 30;

const styles = StyleSheet.create({
    safeview: {
        backgroundColor: 'white',
    },
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: NAVBAR_HEIGHT,
    },
    seperator: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e6e6ea',
    },
    title: {
        fontSize: 18,
        color: '#394352',
        textAlign: 'center',
        overflow: 'hidden',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleCenterContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        height: NAVBAR_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: minWidth,
        height: NAVBAR_HEIGHT,
        paddingHorizontal: 8,
    },
    buttonText: {
        color: '#394352',
        fontSize: 17,
    },
    leftView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    rightView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    gobackView: {
        minWidth: minWidth,
        height: NAVBAR_HEIGHT,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    gobackImage: {
        width: 18,
        height: 16,
    },
});
