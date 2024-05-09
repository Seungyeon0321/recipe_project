import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { ThumbnailStyles } from './thumbnail.styles';


export default function Thumbnail({ foodImage, foodTitle, favorite, time }) {
    const { container, titleContainer, title, image, iconContainer, row, iconFont, icon } = ThumbnailStyles;
    return (
        <View style={container}>
            <Image
                style={image}
                source={foodImage}
            />
            <View style={iconContainer}>
                <View style={row}>
                    <Image
                        style={icon}
                        source={require('../../assets/images/favorite.png')}
                    />
                    <Text style={iconFont}>{favorite}</Text>
                </View>
                <View style={row}>
                    <Image
                        style={icon}
                        source={require('../../assets/images/time.png')}
                    />
                    <Text style={iconFont}>{time}</Text>
                </View>
            </View>
            <View style={titleContainer}>
                <Text style={title}>
                    {foodTitle}
                </Text>
            </View>
        </View>
    );
}