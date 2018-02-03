import React from 'react';
import {View, Text, TouchableOpacity, Image, Keyboard, Platform, StyleSheet} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import PropTypes from 'prop-types';

/**
 * Status bar height for different device type.
 * @type {number}
 */
export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? isIphoneX() ? 44 : 20 : 0;

/**
 * Navigation bar height for different device type.
 * @type {number}
 */
export const NAVBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 44;

/**
 * Total height (include status bar and navigation bar) for different device type.
 * @type {number}
 */
export const TOTALBAR_HEIGHT = NAVBAR_HEIGHT + STATUSBAR_HEIGHT;

/**
 * Goback button identifier.
 * @type {string}
 */
export const GOBACK_BUTTON = '__gobackbutton__';

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
    gobackImage: require('./image/nav_back.png'),
    gobackFunc: null,
};

const gobackButton = (key, style, onPress) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.gobackTouch, custom.style.gobackTouch, style]}>
            <Image
                source={custom.gobackImage}
                style={[styles.gobackImage, custom.style.gobackImage]}
            />
        </TouchableOpacity>
    );
};

/**
 * Navigation Bar.
 */
export default class NaviBar extends React.Component {
    static propTypes = {
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
        titleCenter: PropTypes.bool,
        leftElement: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.element
        ]),
        rightElement: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.element
        ]),
        onLeft: PropTypes.func,
        onRight: PropTypes.func,
        containerStyle: PropTypes.any,
        titleStyle: PropTypes.any,
        leftStyle: PropTypes.any,
        rightStyle: PropTypes.any,
        autoCloseKeyboard: PropTypes.bool,
        navigation: PropTypes.object,
    };

    static defaultProps = {
        title: '',
        titleCenter: false,
        leftElement: GOBACK_BUTTON,
        rightElement: null,
        autoCloseKeyboard: true,
        navigation: null,
    };

    _clickButton = (clicktype, identifier) => {
        this.props.autoCloseKeyboard && Keyboard.dismiss();
        if (identifier === GOBACK_BUTTON) {
            if (custom.gobackFunc) {
                custom.gobackFunc();
            } else {
                this.props.navigation && this.props.navigation.goBack();
            }
        } else {
            this.props[clicktype] && this.props[clicktype](identifier);
        }
    };

    _renderButtons = (type) => {
        const lowerType = type.toLowerCase();
        const styleKey = lowerType + 'Style';
        const elementKey = lowerType + 'Element';
        const style = this.props[styleKey];
        let element = this.props[elementKey];
        if (typeof element === 'string') {
            element = [element];
        }
        if (Array.isArray(element)) {
            const touchStyleKey = lowerType + 'Touch';
            return (
                <View style={[styles[touchStyleKey], custom.style[touchStyleKey], style]}>
                    {element.map((item, index) => {
                        const buttonViewStyle = [styles.buttonView, custom.style.buttonView];
                        const func = this._clickButton.bind(this, type, item);
                        if (item === GOBACK_BUTTON) {
                            return gobackButton(key, undefined, func);
                        } else if (typeof item === 'string') {
                            return (
                                <TouchableOpacity onPress={func} style={buttonViewStyle}>
                                    <Text>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            );
                        } else {
                            return (
                                <View key={index} style={buttonViewStyle}>
                                    {item}
                                </View>
                            );
                        }
                    })}
                </View>
            );
        } else {
            return element;
        }
    };

    _renderTitleView = () => {
        const {title, titleStyle} = this.props;
        if (typeof title === 'string') {
            return (
                <Text numberOfLines={1} style={[styles.title, titleStyle]}>
                    {title}
                </Text>
            );
        } else {
            return title;
        }
    };

    render() {
        const {containerStyle} = this.props;
        return (
            <View style={[styles.container, custom.style.container, containerStyle]}>
                {this._renderButtons('Left')}
                {this._renderTitleView()}
                {this._renderButtons('Right')}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: STATUSBAR_HEIGHT,
        height: TOTALBAR_HEIGHT,
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e6e6ea',
        paddingLeft: 16,
        paddingRight: 16,
    },
    title: {
        flex: 1,
        fontSize: 18,
        color: '#394352',
        textAlign: 'center',
    },
    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 44,
        height: NAVBAR_HEIGHT,
    },
    buttonText: {
        color: '#394352',
        fontSize: 17,
    },
    gobackTouch: {
        minWidth: 44,
        height: NAVBAR_HEIGHT,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    gobackImage: {
        width: 18,
        height: 16,
    },
    leftTouch: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    rightTouch: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});