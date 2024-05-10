import { StyleSheet } from "react-native";

export const ThumbnailStyles = StyleSheet.create({
    container: {
        marginTop: 25,
    },
    image: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: '100%',
        opacity: 0.7,
    },
    titleContainer: {
        backgroundColor: '#FDBF50',
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    title: {
        fontFamily:'raleway-bold',
        fontSize: 16,
    },
    iconContainer: {
        position: 'absolute',
        left: 20,
        top: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    iconFont: {
        fontFamily:'raleway-bold',
        fontSize: 20
    },
    icon: {
        marginRight: 5,
    }
});