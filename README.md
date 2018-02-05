# react-native-pure-navigation-bar

[![Build Status](https://travis-ci.org/gaoxiaosong/react-native-pure-navigation-bar.svg?branch=master)](https://travis-ci.org/gaoxiaosong/react-native-pure-navigation-bar)
[![React Native](https://img.shields.io/badge/react%20native-0.52.2-brightgreen.svg)](https://github.com/facebook/react-native)
[![License](https://img.shields.io/aur/license/yaourt.svg)](https://github.com/gaoxiaosong/react-native-pure-navigation-bar/blob/master/LICENSE)

[中文说明](https://github.com/gaoxiaosong/react-native-pure-navigation-bar/blob/master/README-zh_CN.md)

Here is a fully customizable navigation bar in React-Native. You can set the global unified style of navigation bar and add it as a react component in each page.

## Install

Install by Yarn:

```
yarn add react-native-pure-navigation-bar
```

Install by NPM:

```
npm install --save react-native-pure-navigation-bar
```

## Usage

First import in the file:

```
import NaviBar from 'react-native-pure-navigation-bar';
```

Then add component in render() function:

```
render() {
  return (
    <View style={{flex: 1}}>
      <NaviBar
        title='CustomTitle'
        {/* other properties if you want to specify it */}
      />
      {/* other components */}
    </View>
  );
}
```

If you want to hide or show navigation bar dynamiclly, you can write these code:

```
render() {
  return (
    <View style={{flex: 1}}>
      {this.state.showNaviBar && (
        <NaviBar
          title='CustomTitle'
          {/* other properties if you want to specify it */}
        />
      )}
      {/* other components */}
    </View>
  );
}
```

This navigation bar is only a component with 'relative' position, not 'absolute' position. If you want to use absolute position, please use the 'style' property in following section.

## Global Settings

## Custom Setting

## Style

The component style is consist of three part:

* User custom style, passed by component props, is highest level.
* Global setting style, set by method in 'Global Settings' sections, is medium level, can be override by User custom style.
* Inner style, written in library code, is lowest level, can be override by the two styles above.

All the key you can customize in Global or Custom settings list below:

| Key | Description | DefaultValue |
| :-: | :-: | :-: |
| container | The whole navigation bar | justifyContent: 'space-between'<br>flexDirection: 'row'<br>alignItems: 'center'<br>paddingTop: STATUSBAR_HEIGHT<br>height: TOTALBAR_HEIGHT<br>backgroundColor: 'white' |
| seperator | Seperator line at the bottom | borderBottomWidth: StyleSheet.hairlineWidth<br>borderBottomColor: '#e6e6ea' |
| title | Inner title text | fontSize: 18<br>color: '#394352'<br>textAlign: 'center'<br>overflow: 'hidden' |
| titleContainer | Title container off center | flex: 1<br>justifyContent: 'center'<br>alignItems: 'center' |
| titleCenterContainer | Title container at center | position: 'absolute'<br>left: 0<br>right: 0<br>top: 0<br>bottom: 0<br>justifyContent: 'center'<br>alignItems: 'center' |
| buttonView | Text-type button touchable view | justifyContent: 'center'<br>alignItems: 'center'<br>minWidth: minWidth<br>height: NAVBAR_HEIGHT<br>paddingHorizontal: 8 |
| buttonText | Text-type button text | color: '#394352'<br>fontSize: 17 |
| leftView | Left view contains all left buttons | flexDirection: 'row'<br>justifyContent: 'center'<br>alignItems: 'flex-start' |
| rightView | Right view contains all right buttons | flexDirection: 'row'<br>justifyContent: 'center'<br>alignItems: 'flex-end' |
| gobackView | Goback button touchable view | minWidth: minWidth<br>height: NAVBAR_HEIGHT<br>justifyContent: 'center'<br>paddingHorizontal: 16 |
| gobackImage | Goback button image | width: 18<br>height: 16 |