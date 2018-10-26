# react-native-pure-navigation-bar

[中文说明](README-zh_CN.md)

Here is a fully customizable navigation bar in React-Native. You can set the global unified style of navigation bar and add it as a react component in each page.

It supports:

* Portrait and Landscape mode.
* Auto go back with `react-navigation` installed.

## ScreenShots

### iPhone 8 Plus

<p float="left">

<img src="/resource/1-8P.png" width="18%">

<img src="/resource/2-8P.png" width="18%">

<img src="/resource/3-8P.png" width="18%">

<img src="/resource/4-8P.png" width="18%">

<img src="/resource/5-8P.png" width="18%">

</p>

### iPhone X

<p float="left">

<img src="/resource/1-X.png" width="18%">

<img src="/resource/2-X.png" width="18%">

<img src="/resource/3-X.png" width="18%">

<img src="/resource/4-X.png" width="18%">

<img src="/resource/5-X.png" width="18%">

</p>

### Android

<p float="left">

<img src="/resource/1-A.jpg" width="18%">

<img src="/resource/2-A.jpg" width="18%">

<img src="/resource/3-A.jpg" width="18%">

<img src="/resource/4-A.jpg" width="18%">

<img src="/resource/5-A.jpg" width="18%">

</p>

## Install

Install by Yarn:

```shell
yarn add react-native-pure-navigation-bar
```

Install by NPM:

```shell
npm install --save react-native-pure-navigation-bar
```

You should also install the package in `peerDependencies`:

* react
* react-native
* react-navigation

## Usage

First import in the file:

```jsx
import NaviBar from 'react-native-pure-navigation-bar';
```

Then add component in `render()` function:

```jsx
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

```jsx
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

| Name | Description |
| :-: | :-: |
| NAVBAR_HEIGHT | Default navigation bar height |
| GOBACK_BUTTON | An identifier when you set 'leftElement' or 'rightElement' to identify the button as GoBack button |
| GOBACK_IMAGE | An default image for GOBACK_BUTTON |

## Global Settings

You can change the navigation bar settings at the startup, include navigation bar style, button minimum width and GoBack button image.

You can set options like this:

```jsx
import {NaviBarOptions} from 'react-native-pure-navigation-bar';

NaviBarOptions.xxx = yyy;
```

Options:

| Name | Description | Example |
| :-: | :-: | :-: |
| style | Set all the style include bar or button or title | NaviBarOptions.style.container = {...} |
| buttonWidth | Minimum button width | NaviBarOptions.buttonWidth = 20 |
| gobackImage | GoBack button image | NaviBarOptions.gobackImage = {uri: "..."} / require('...') |

## Custom Setting

You can control the action or style of navigation bar by passing 'props'.

| PropName | Type | DefaultValue | Description |
| :-: | :-: | :-: | :-: |
| title | string or element | '' | Title view of text style or user custom view |
| titleCenter | bool | true | Title is must at center or not |
| hasSeperatorLine | bool | true | Bottom of navigation bar has a seperator line or not |
| leftElement | string or element or array | GOBACK_BUTTON | Left buttons, a string means a button of text style, an element means a button view, an array of string means an array of button which maybe text or custom view |
| rightElement | string or string array or element | null | Right buttons, same format as 'leftElement' |
| onLeft | function | undefined | Left button click function, param is button index in 'leftElement', from 0 on. If return is false and button is goback button, then do not call the default goback action |
| onRight | function | undefined | Right button click function, same format as 'onLeft' |
| autoCloseKeyboard | bool | true | Auto dismiss keyboard when click button or not |
| autoHardwareBack | bool | true | Auto listen hardware back event on Android or not |
| lockEnabled | bool | true | Enable or disable button clicking lock to avoid clicking multi times |
| safeOptions | object or false | only disable bottom | Safe area option of navigation bar. Use 'false' to disable |
| style | style object | {} | A custom style which has highest priority, object's key is in following 'Style' section |

## Style

The component style is consist of three part:

* User custom style, passed by component props, is highest level.
* Global setting style, set by method in 'Global Settings' sections, is medium level, can be override by User custom style.
* Inner style, written in library code, is lowest level, can be override by the two styles above.

All the key you can customize in Global or Custom settings list below:

| Key | Description |
| :-: | :-: |
| safeview | Safe area view |
| container | The whole navigation bar |
| seperator | Seperator line at the bottom |
| title | Inner title text |
| titleContainer | Title container off center |
| titleCenterContainer | Title container at center |
| buttonView | Text-type button touchable view |
| buttonText | Text-type button text |
| leftView | Left view contains all left buttons |
| rightView | Right view contains all right buttons |
| gobackView | Goback button touchable view |
| gobackImage | Goback button image |

## Example Project

You can open the example project by following steps:

1. `cd example`.
1. Use `yarn` or `npm install` to install the modules.
1. For iOS, you should run `pod install` in `ios` directory.
1. Run `npm run bundle:ios` or `npm run bundle:android` to bundle the package.
1. Run `npm start` in a seperate terminal.
1. Use `Xcode` or `Android Studio` to open the project in `example/ios` or `example/android`.
1. Run the project.