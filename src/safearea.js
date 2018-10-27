import { Dimensions, Platform, StatusBar } from 'react-native';

export function getSafeAreaInset(isLandscape = undefined, isTranslucent = false) {
    if (isLandscape === undefined) {
        const {width, height} = Dimensions.get('window');
        isLandscape = width > height;
    }
    const inset = (top, right, bottom, left) => ({top, right, bottom, left});
    if (isIphoneX()) {
        return isLandscape ? inset(0, 44, 21, 44) : inset(44, 0, 34, 0);
    } else if (Platform.OS === 'ios') {
        return inset(20, 0, 0, 0);
    } else {
        return inset(isTranslucent ? StatusBar.currentHeight : 0, 0, 0, 0);
    }
}

export function forceInset(top, right, bottom, left) {
    return {
        top: top ? 'always' : 'never',
        right: right ? 'always' : 'never',
        bottom: bottom ? 'always' : 'never',
        left: left ? 'always' : 'never',
    };
}

function isIphoneX() {
    const {width, height} = Dimensions.get('window');
    const edge = Math.max(width, height);
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (
            edge === 812 || // X + XS
            edge === 896 // XR + XS Max
        )
    );
}