import React from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, SafeAreaView, View, ScrollView } from 'react-native';
import NaviBar, { GOBACK_BUTTON, getSafeAreaInset, DEFAULT_NAVBAR_HEIGHT } from 'react-native-pure-navigation-bar';
import { createStackNavigator } from 'react-navigation';

class WelcomePage extends React.Component {
    _jump = () => {
        this.props.navigation.navigate('Example', {});
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <TouchableOpacity style={{flex: 1}} onPress={this._jump}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 28, color: 'red',textAlign: 'center'}}>
                            {'Jump To Test'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'TestPage',
            titleCenter: false,
            seperator: true,
            leftElement: undefined,
            rightElement: undefined,
            containerStyle: undefined,
            titleStyle: undefined,
            leftStyle: undefined,
            rightStyle: undefined,
        };
    }

    _renderItem = (key, trueValue, falseValue, trueTitle, falseTitle, isTrue = item => !!item) => {
        const title = isTrue(this.state[key]) ? trueTitle : falseTitle;
        const onPress = () => this.setState({[key]: isTrue(this.state[key]) ? falseValue : trueValue});
        return (
            <TouchableOpacity onPress={onPress} style={styles.touch}>
                <Text style={styles.text}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    };

    render() {
        const style = this.state.isAbsolute ? {
            paddingTop: getSafeAreaInset().top + DEFAULT_NAVBAR_HEIGHT,
        } : undefined;
        return (
            <View style={styles.container}>
                <NaviBar
                    title={this.state.title}
                    titleCenter={this.state.titleCenter}
                    hasSeperatorLine={this.state.seperator}
                    leftElement={this.state.leftElement}
                    rightElement={this.state.rightElement}
                    isAbsolute={this.state.isAbsolute}
                    gobackText={this.state.gobackText}
                    style={{
                        container: this.state.containerStyle,
                        title: this.state.titleStyle,
                        leftView: this.state.leftStyle,
                        rightView: this.state.rightStyle,
                    }}
                />
                <ScrollView
                    style={styles.scrollview}
                    contentContainerStyle={style}
                >
                    {this._renderItem('isAbsolute', true, false, 'Make Normal', 'Make Absolute')}
                    {this._renderItem('title', 'TestPage', 'This a test page and title is very long', 'Make Title Longer', 'Make Title Shorter', item => item === 'TestPage')}
                    {this._renderItem('titleCenter', true, false, 'Make Title UnCenter', 'Make Title Center')}
                    {this._renderItem('seperator', true, false, 'Hide Seperator', 'Show Seperator')}
                    {this._renderItem('gobackText', '(123)', undefined, 'Make Goback Text Number', 'Make Goback Text None')}
                    {this._renderItem('leftElement', [GOBACK_BUTTON, 'Close'], undefined, 'Make Left Empty', 'Make Left Full')}
                    {this._renderItem('rightElement', ['OK', 'Hello'], undefined, 'Make Right Empty', 'Make Right Full')}
                    {this._renderItem('containerStyle', {backgroundColor: 'gray'}, undefined, 'Make Whole Normal', 'Make Whole Gray')}
                    {this._renderItem('titleStyle', {backgroundColor: 'green'}, undefined, 'Make Title Normal', 'Make Title Green')}
                    {this._renderItem('leftStyle', {backgroundColor: 'yellow'}, undefined, 'Make Left Normal', 'Make Left Yellow')}
                    {this._renderItem('rightStyle', {backgroundColor: 'red'}, undefined, 'Make Right Normal', 'Make Right Red')}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
    },
    scrollview: {
        flex: 1,
    },
    touch: {
        height: 44,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#e15151',
        borderRadius: 4,
        overflow: 'hidden',
    },
    text: {
        fontSize: 16,
        lineHeight: 44,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: 'white',
    },
});

const navigator = createStackNavigator({
    Welcome: {screen: WelcomePage},
    Example: {screen: Example}
}, {
    headerMode: 'none',
});

AppRegistry.registerComponent('test', () => navigator);