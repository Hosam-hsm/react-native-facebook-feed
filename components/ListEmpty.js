import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";

const ListEmptyComponent = ({ }) => {
    return (
        <View style={styles.container}>
            <Text>No items to show</Text>
        </View>
    )
};
export default ListEmptyComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Dimensions.get('window').height - 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})