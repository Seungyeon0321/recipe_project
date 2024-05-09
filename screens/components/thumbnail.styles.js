import { StyleSheet } from "react-native";

export const ThumbnailStyles = StyleSheet.create({
    container: {
        marginTop: 25,
    },
    image: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: '100%',
        opacity: 0.7,
    },
    titleContainer: {
        backgroundColor: '#FDBF50',
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    title: {
        // fontFamily:'Raleway-Bold'
        fontSize: 16,
        fontWeight: 'bold'
    },
    iconContainer: {
        position: 'absolute',
        left: 20,
        top: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconFont: {
        // fontFamily:'Raleway-Bold'
        fontSize: 20
    },
    icon: {
        marginRight: 5,
    }
});