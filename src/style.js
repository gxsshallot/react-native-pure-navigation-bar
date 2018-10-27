import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safeView: {
        flex: 0,
        backgroundColor: 'white',
    },
    absoluteView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        zIndex: 1,
    },
    normalView: {
        backgroundColor: 'white',
    },
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
    },
    seperator: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#dddddd',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
        overflow: 'hidden',
    },
    leftView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightView: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    buttonText: {
        color: 'black',
        fontSize: 17,
    },
    gobackView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -8,
        paddingLeft: 8,
        paddingRight: 8,
    },
    gobackImage: {
        width: 18,
        height: 16,
        marginRight: 8,
    },
    gobackText: {
        marginLeft: -8,
        color: 'black',
        fontSize: 17,
    },
});