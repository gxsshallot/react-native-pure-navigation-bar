import React from 'react';
import {View, Text, TouchableOpacity, Image, Keyboard, StyleSheet, BackHandler, SafeAreaView } from 'react-native';
import { withNavigation } from 'react-navigation'

export const NAVBAR_HEIGHT = 44;

export const GOBACK_BUTTON = '__gobackbutton__';

export const GOBACK_IMAGE = require('./image/nav_back.png');

export const NaviBarOptions = {
    style: {},
    buttonWidth: 30,
    gobackImage: GOBACK_IMAGE,
};

class NaviBar extends React.PureComponent {
    static defaultProps = {
        title: '',
        titleCenter: true,
        hasSeperatorLine: true,
        leftElement: GOBACK_BUTTON,
        rightElement: null,
        autoCloseKeyboard: true,
        autoHardwareBack: true,
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
        return [styles[key], ...style, NaviBarOptions.style[key], this.props.style[key]];
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
            this.props.navigation && this.props.navigation.goBack();
        }
        if (lockEnabled) {
            this.locks[lockKey] = false;
        }
    };

    _renderButton = (type, item, index) => {
        const func = this._clickButton.bind(this, type, item, index);
        const specStyle = {
            marginHorizontal: 5,
            ['margin' + type]: 0,
            minWidth: NaviBarOptions.buttonWidth,
        };
        const buttonViewStyle = this._combineStyle('buttonView', specStyle);
        if (item === GOBACK_BUTTON) {
            return (
                <TouchableOpacity key={index} onPress={func} style={this._combineStyle('gobackView', specStyle)}>
                    <Image
                        source={NaviBarOptions.gobackImage}
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

    _renderView = (seperatorLineStyle) => {
        const {titleCenter} = this.props;
        const edge = Math.max(this.state.Left, this.state.Right) + 15;
        const maxWidthCenterStyle = titleCenter
            ? {left: edge, right: edge}
            : {};
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
        const {safeOptions, hasSeperatorLine} = this.props;
        const seperatorLineStyle = hasSeperatorLine ? this._combineStyle('seperator') : {};
        if (safeOptions) {
            return (
                <SafeAreaView
                    style={[this._combineStyle('safeview'), seperatorLineStyle]}
                    forceInset={safeOptions}
                >
                    {this._renderView()}
                </SafeAreaView>
            );
        } else {
            return this._renderView(seperatorLineStyle);
        }
    }
}

export default withNavigation(NaviBar);

const styles = StyleSheet.create({
    safeview: {
        flex: 0,
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
        height: NAVBAR_HEIGHT,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    gobackImage: {
        width: 18,
        height: 16,
    },
});
