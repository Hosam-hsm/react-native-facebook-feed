import React from "react";
import {
    StyleSheet,
    Image,
    SafeAreaView,
} from "react-native";

const ImagePreview = ({ route }) => {
    const { images } = route.params
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.image} source={{ uri: images[0] }} />
        </SafeAreaView>
    )
};
export default ImagePreview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 300,
        width: '100%',
        resizeMode: 'contain'
    }
})