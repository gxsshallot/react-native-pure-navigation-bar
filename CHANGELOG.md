# CHANGELOG

## 1.2.6

* Move all dependencies except `react-native-iphone-x-helper` to `example/package.json`.
* Add constant `GOBACK_IMAGE` as the default image of goback button.

## 1.2.5

* Add support for translucent props.
    * If status bar is translucent, you should set it to `true` and the top part of navigation bar is `transparent`.
    * If status bar is not translucent, you should set it to `false` and navigation bar's background color will be `white` everywhere.