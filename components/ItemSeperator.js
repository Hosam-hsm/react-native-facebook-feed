import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

const ItemSeperator = () => {
    return (
        <View style={styles.ItemSeparatorComponent} />
    )
}
export default ItemSeperator;

const styles = StyleSheet.create({
    ItemSeparatorComponent: {
        paddingVertical: 4,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: 'lightgrey'
    },
    boldText: {
        fontWeight: 'bold',
    },
})