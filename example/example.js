import React from 'react';
import {StyleSheet, Text, View, AppRegistry, TouchableOpacity} from 'react-native';
import NaviBar, {GOBACK_BUTTON} from '../index';

export class Example extends React.Component {
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
        return (
            <View style={styles.container}>
                <NaviBar
                    title={this.state.title}
                    titleCenter={this.state.titleCenter}
                    hasSeperatorLine={this.state.seperator}
                    leftElement={this.state.leftElement}
                    rightElement={this.state.rightElement}
                    style={{
                        container: this.state.containerStyle,
                        title: this.state.titleStyle,
                        leftView: this.state.leftStyle,
                        rightView: this.state.rightStyle,
                    }}
                />
                {this._renderItem('title', 'TestPage', 'This a test page and title is very long', 'Make Title Longer', 'Make Title Shorter', item => item === 'TestPage')}
                {this._renderItem('titleCenter', true, false, 'Make Title UnCenter', 'Make Title Center')}
                {this._renderItem('seperator', true, false, 'Hide Seperator', 'Show Seperator')}
                {this._renderItem('leftElement', [GOBACK_BUTTON, 'Close'], undefined, 'Make Left Empty', 'Make Left Full')}
                {this._renderItem('rightElement', 'OK', undefined, 'Make Right Empty', 'Make Right Full')}
                {this._renderItem('containerStyle', {backgroundColor: 'gray'}, undefined, 'Make Whole Normal', 'Make Whole Gray')}
                {this._renderItem('titleStyle', {backgroundColor: 'green'}, undefined, 'Make Title Normal', 'Make Title Green')}
                {this._renderItem('leftStyle', {backgroundColor: 'blue'}, undefined, 'Make Left Normal', 'Make Left Blue')}
                {this._renderItem('rightStyle', {backgroundColor: 'red'}, undefined, 'Make Right Normal', 'Make Right Red')}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
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

AppRegistry.registerComponent('test', () => Example);