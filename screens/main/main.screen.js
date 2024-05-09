import { ScrollView, SafeAreaView, StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { MainStyles } from './main.styles';
import Thumbnail from '../components/thumbnail';
import { FoodData } from './foodData';

export default function MainScreen() {
    const { rootContainer, search, searchIcon } = MainStyles;
    return (
        <SafeAreaView style={rootContainer}>
            <ScrollView>
                <View style={search}>
                    <TextInput
                        placeholder='what are you cooking today?'
                        fontStyle='italic'
                    />
                    <Image
                        style={searchIcon}
                        source={require('../../assets/images/search.png')}
                    />
                </View>
                {FoodData.map((food, index) => (
                    <Thumbnail
                        key={index}
                        foodImage={food.image}
                        foodTitle={food.title}
                        favorite={food.favorite}
                        time={food.time}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};