# react-native-pure-navigation-bar

[实际截图](resource/ScreenShot.md)

这是一个用于React-Native环境的可完全自定义的导航条，可以设置全局统一样式，并且将它以React组件的形式放在每一个页面中。

目前支持:

* 竖屏或横屏模式。
* 使用`react-navigation`处理自动回退操作.

## 安装

使用Yarn安装：

```shell
yarn add react-native-pure-navigation-bar
```

使用npm安装：

```shell
npm install --save react-native-pure-navigation-bar
```

## 使用

首先在文件中导入：

```jsx
import NaviBar from 'react-native-pure-navigation-bar';
```

然后在`render()`方法中添加导航条组件：

```jsx
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

如果你想动态的显示或者隐藏导航条，可以写如下代码：

```jsx
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

| 名称 | 描述 |
| :-: | :-: |
| NAVBAR_HEIGHT | 默认导航条高度 |
| GOBACK_BUTTON | 可以在leftElement或者rightElement中设置的常量，用来标识这是一个特殊的回退按钮 |
| GOBACK_IMAGE | 回退按钮的默认图片 |

## 全局设置

可以在启动的时候改变导航条的高度，包括导航条样式、最小按钮宽度和回退按钮的图片。

你可以像这样设置:

```jsx
import {NaviBarOptions} from 'react-native-pure-navigation-bar';

NaviBarOptions.xxx = yyy;
```

选项:

| Name | Description | Example |
| :-: | :-: | :-: |
| style | 设置所有的全局样式，包括导航条、按钮、标题等 | NaviBarOptions.style.container = {...} |
| buttonWidth | 最小按钮宽度 | NaviBarOptions.buttonWidth = 20 |
| gobackImage | 回退按钮的图片 | NaviBarOptions.gobackImage = {uri: "..."} / require('...') |

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
| autoHardwareBack | 布尔值 | true | 是否自动监听Android键盘回退事件 |
| lockEnabled | 布尔值 | true | 启用或禁用锁，防止按钮多次点击 |
| safeOptions | 对象或false | 只禁用底部 | 导航条的安全区域配置，使用'false'禁用 |
| style | 样式对象 | {} | 一个自定义的样式对象，里面的键参考Style部分 |

## 样式

组件的样式是由三个部分组成的:

* 用户自定义样式，使用props传递，最高优先级。
* 全局设置样式，使用全局设置部分的方法设置，中等优先级，可以被用户自定义样式覆盖。
* 内部样式，在代码中直接写入的样式，最低优先级，可以被上述两种样式覆盖。

在全局设置或者用户自定义设置部分，你可以自定义的样式的键如下所示:

| 键名 | 描述 | 默认值 |
| :-: | :-: | :-: |
| safeview | 安全区域视图 | flex: 0<br>backgroundColor: 'white' |
| container | 整个导航条 | justifyContent: 'space-between'<br>flexDirection: 'row'<br>alignItems: 'center'<br>height: NAVBAR_HEIGHT<br>backgroundColor: 'white' |
| seperator | 底部分隔线 | borderBottomWidth: StyleSheet.hairlineWidth<br>borderBottomColor: '#e6e6ea' |
| title | 内部标题文本 | fontSize: 18<br>color: '#394352'<br>textAlign: 'center'<br>overflow: 'hidden' |
| titleContainer | 不居中的标题容器 | flex: 1<br>justifyContent: 'center'<br>alignItems: 'center' |
| titleCenterContainer | 居中的标题容器 | position: 'absolute'<br>left: 0<br>right: 0<br>top: 0<br>bottom: 0<br>justifyContent: 'center'<br>alignItems: 'center' |
| buttonView | 文本按钮的可点击区域 | justifyContent: 'center'<br>alignItems: 'center'<br>minWidth: NaviBarOptions.buttonWidth<br>height: NAVBAR_HEIGHT<br>paddingHorizontal: 8 |
| buttonText | 文本按钮的文本 | color: '#394352'<br>fontSize: 17 |
| leftView | 所有左侧按钮的区域 | flexDirection: 'row'<br>justifyContent: 'center'<br>alignItems: 'flex-start' |
| rightView | 所有右侧按钮的区域 | flexDirection: 'row'<br>justifyContent: 'center'<br>alignItems: 'flex-end' |
| gobackView | 回退按钮的可点击区域 | minWidth: NaviBarOptions.buttonWidth<br>height: NAVBAR_HEIGHT<br>justifyContent: 'center'<br>paddingHorizontal: 16 |
| gobackImage | 回退按钮的图片 | width: 18<br>height: 16 |

## 样例工程

你可以使用如下步骤来打开样例工程：

1. `cd example`.
1. 使用`yarn`或`npm install`安装模块。
1. 在iOS中, 需要在`ios`目录中运行`pod install`命令.
1. 运行`npm run bundle:ios`或`npm run bundle:android`打包。
1. 在一个单独的终端中运行`npm start`。
1. 使用`Xcode`或`Android Studio`打开`example/ios`或`example/android`中的工程。
1. 运行工程。

## 参考

请参照这个仓库的说明: [react-native-items](https://github.com/gaoxiaosong/react-native-items/blob/master/README-zh_CN.md).