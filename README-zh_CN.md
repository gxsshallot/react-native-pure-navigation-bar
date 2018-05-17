# react-native-pure-navigation-bar

[![编译状态](https://travis-ci.org/gaoxiaosong/react-native-pure-navigation-bar.svg?branch=master)](https://travis-ci.org/gaoxiaosong/react-native-pure-navigation-bar)
[![React Native](https://img.shields.io/badge/react%20native-0.52.2-brightgreen.svg)](https://github.com/facebook/react-native)
[![License](https://img.shields.io/aur/license/yaourt.svg)](https://github.com/gaoxiaosong/react-native-pure-navigation-bar/blob/master/LICENSE)

[实际截图](https://github.com/gaoxiaosong/react-native-pure-navigation-bar/blob/master/resource/README.md)

这是一个用于React-Native环境的可完全自定义的导航条，可以设置全局统一样式，并且将它以React组件的形式放在每一个页面中。

## 安装

使用Yarn安装:

```
yarn add react-native-pure-navigation-bar
```

使用npm安装:

```
npm install --save react-native-pure-navigation-bar
```

## 使用

首先在文件中导入:

```
import NaviBar from 'react-native-pure-navigation-bar';
```

然后在render()方法中添加导航条组件:

```
render() {
  return (
    <View style={{flex: 1}}>
      <NaviBar
        title='自定义标题'
        {/* 如果想定制，可以传入props */}
      />
      {/* 其他组件 */}
    </View>
  );
}
```

如果你想动态的显示或者隐藏导航条，可以写如下代码:

```
render() {
  return (
    <View style={{flex: 1}}>
      {this.state.showNaviBar && (
        <NaviBar
          title='自定义标题'
          {/* 如果想定制，可以传入props */}
        />
      )}
      {/* 其他组件 */}
    </View>
  );
}
```

这个导航条视图只是一个使用相对布局的React组件，不是绝对布局。如果想使用绝对布局，请在参考下面的Style部分，在全局中设置样式或者在属性中设置自定义样式。

## 常量

可以像这样导入导航条高度的常量:

```
import {STATUSBAR_HEIGHT} from 'react-native-pure-navigation-bar';
```

所有关于导航条的常量如下所示:

| 名称 | iOS (X) | iOS (not X) | Android | 描述 |
| :-: | :-: | :-: | :-: | :-: |
| STATUSBAR_HEIGHT | 44 | 20 | 0 | 状态栏高度 |
| NAVBAR_HEIGHT | 44 | 44 | 44 | 导航条高度 |
| TOTALBAR_HEIGHT | 88 | 64 | 44 | 状态栏和导航条的总高度 |

其他常量:

| 名称 | 描述 |
| :-: | :-: |
| GOBACK_BUTTON | 可以在leftElement或者rightElement中设置的常量，用来标识这是一个特殊的回退按钮 |

## 全局设置

可以在启动的时候改变导航条的高度，包括导航条样式，回退按钮的图片和操作。

首先，需要导入方法:

```
import {setCustomStyle} from 'react-native-pure-navigation-bar';
```

所有方法如下所示(没有返回值):

| 名称 | 描述 | 参数格式 |
| :-: | :-: | :-: |
| setCustomStyle | 设置所有的全局样式，包括导航条、按钮、标题等 | (key, style):<br>key: 一个样式的键，可以参考下面的Style部分<br>style: 一个StyleSheet的样式或者只是一个css对象 |
| setGlobalGobackFunc | 设置回退按钮的操作 | (func):<br>func: 一个函数，没有参数和返回值 |
| setGlobalGobackImage | 设置回退按钮的图片 | (image):<br>image: 本地图片或者一个URL字符串的远程图片 |

## 自定义设置

可以通过传递属性控制导航条的操作或者样式。

| 属性名 | 类型 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: |
| title | 字符串或者组件 | '' | 文本样式的标题或者用户自定义组件 |
| titleCenter | 布尔值 | true | 标题是否必须居中 |
| hasSeperatorLine | 布尔值 | true | 导航条底部是否有分隔线 |
| leftElement | 字符串或组件或数组 | GO_BACKBUTTON | 左面按钮集合，字符串表示文本按钮，组件表示自定义按钮，数组可以混合包含文本和组件按钮 |
| rightElement | 字符串或组件或数组 | null | 右面按钮集合，和leftElement格式相同 |
| onLeft | 函数 | undefined | 左面按钮的点击事件，参数是按钮在leftElement中的索引值，从0开始，如果返回值是false并且按钮是回退按钮，则不进行默认的回退操作 |
| onRight | 函数 | undefined | 右面按钮的点击事件，和onLeft格式相同 |
| autoCloseKeyboard | 布尔值 | true | 在点击按钮时是否自动关闭键盘 |
| navigation | 导航对象 | null | 一个StackNavigation对象，用来回退按钮进行回退操作 |
| style | 样式对象 | {} | 一个自定义的样式对象，里面的键参考Style部分 |

## 样式

组件的样式是由三个部分组成的:

* 用户自定义样式，使用props传递，最高优先级。
* 全局设置样式，使用全局设置部分的方法设置，中等优先级，可以被用户自定义样式覆盖。
* 内部样式，在代码中直接写入的样式，最低优先级，可以被上述两种样式覆盖。

在全局设置或者用户自定义设置部分，你可以自定义的样式的键如下所示:

| 键名 | 描述 | 默认值 |
| :-: | :-: | :-: |
| container | 整个导航条 | justifyContent: 'space-between'<br>flexDirection: 'row'<br>alignItems: 'center'<br>paddingTop: STATUSBAR_HEIGHT<br>height: TOTALBAR_HEIGHT<br>backgroundColor: 'white' |
| seperator | 底部分隔线 | borderBottomWidth: StyleSheet.hairlineWidth<br>borderBottomColor: '#e6e6ea' |
| title | 内部标题文本 | fontSize: 18<br>color: '#394352'<br>textAlign: 'center'<br>overflow: 'hidden' |
| titleContainer | 不居中的标题容器 | flex: 1<br>justifyContent: 'center'<br>alignItems: 'center' |
| titleCenterContainer | 居中的标题容器 | position: 'absolute'<br>left: 0<br>right: 0<br>top: STATUSBAR_HEIGHT<br>bottom: 0<br>justifyContent: 'center'<br>alignItems: 'center' |
| buttonView | 文本按钮的可点击区域 | justifyContent: 'center'<br>alignItems: 'center'<br>minWidth: minWidth<br>height: NAVBAR_HEIGHT<br>paddingHorizontal: 8 |
| buttonText | 文本按钮的文本 | color: '#394352'<br>fontSize: 17 |
| leftView | 所有左侧按钮的区域 | flexDirection: 'row'<br>justifyContent: 'center'<br>alignItems: 'flex-start' |
| rightView | 所有右侧按钮的区域 | flexDirection: 'row'<br>justifyContent: 'center'<br>alignItems: 'flex-end' |
| gobackView | 回退按钮的可点击区域 | minWidth: minWidth<br>height: NAVBAR_HEIGHT<br>justifyContent: 'center'<br>paddingHorizontal: 16 |
| gobackImage | 回退按钮的图片 | width: 18<br>height: 16 |