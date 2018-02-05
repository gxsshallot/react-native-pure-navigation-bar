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

## Constant

You can import navigation bar height constant like this:

```
import {STATUSBAR_HEIGHT} from 'react-native-pure-navigation-bar';
```

All constant about navigation bar height list below:

| Name | iOS (X) | iOS (not X) | Android | Description |
| :-: | :-: | :-: | :-: | :-: |
| STATUSBAR_HEIGHT | 44 | 20 | 0 | Only status bar height |
| NAVBAR_HEIGHT | 44 | 44 | 44 | Only navigation bar height |
| TOTALBAR_HEIGHT | 88 | 64 | 44 | Total height of status bar and navigation bar |

Other constant:

| Name | Description |
| :-: | :-: |
| GOBACK_BUTTON | An identifier when you set 'leftElement' or 'rightElement' to identify the button as GoBack button |

## Global Settings

You can change the navigation bar settings at the startup, include navigation bar style, GoBack button image and function.

First, you should import methed from library:

```
import {setCustomStyle} from 'react-native-pure-navigation-bar';
```

All the method list below (no return value):

| Name | Description | Param Format |
| :-: | :-: | :-: |
| setCustomStyle | Set all the style include bar or button or title | (key, style):<br>key: A style key which you can see the following 'Style' section<br>style: A style object created by StyleSheet or only an javascript object |
| setGlobalGobackFunc | Set GoBack button function | (func):<br>func: A function with no param and no return value|
| setGlobalGobackImage | Set GoBack button image | (image):<br>image: A number which means a local image or a string which is a remote image url |

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
| titleCenterContainer | Title container at center | position: 'absolute'<br>left: 0<br>right: 0<br>top: STATUSBAR_HEIGHT<br>bottom: 0<br>justifyContent: 'center'<br>alignItems: 'center' |
| buttonView | Text-type button touchable view | justifyContent: 'center'<br>alignItems: 'center'<br>minWidth: minWidth<br>height: NAVBAR_HEIGHT<br>paddingHorizontal: 8 |
| buttonText | Text-type button text | color: '#394352'<br>fontSize: 17 |
| leftView | Left view contains all left buttons | flexDirection: 'row'<br>justifyContent: 'center'<br>alignItems: 'flex-start' |
| rightView | Right view contains all right buttons | flexDirection: 'row'<br>justifyContent: 'center'<br>alignItems: 'flex-end' |
| gobackView | Goback button touchable view | minWidth: minWidth<br>height: NAVBAR_HEIGHT<br>justifyContent: 'center'<br>paddingHorizontal: 16 |
| gobackImage | Goback button image | width: 18<br>height: 16 |