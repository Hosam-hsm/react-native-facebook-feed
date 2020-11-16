import { observer } from "mobx-react";
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";
import images from "../constants/Images";

export const getReactionIcon = (reaction) => {
    switch (reaction) {
        case 'like':
            return images.like_static_fill;
        case 'love':
            return images.love_static;
        case 'haha':
            return images.haha_static;
        case 'wow':
            return images.wow_static;
        case 'sad':
            return images.sad_static;
        case 'angry':
            return images.angry_static;
        default:
            return images.like_static_fill;
    }
}
const sum = (obj) => {
    var sum = 0;
    for (var el in obj) {
        if (obj.hasOwnProperty(el)) {
            sum += parseFloat(obj[el]);
        }
    }
    return sum;
}

const Reactions = ({ reactions }) => {
    return (
        <View style={styles.row}>
            {Object.keys(reactions).map((reaction, i) => {
                if (i < 3) //we only need to show maximum of 3 reaction icons.
                    return <View
                        key={i}
                        style={[styles.reactionIconContainer, { zIndex: i * -1, transform: [{ translateX: i * -2 }] }]}>
                        <Image
                            source={getReactionIcon(reaction)}
                            style={styles.reactionIcon} />
                    </View>
            })}
            {Object.keys(reactions).length != 0 && <Text style={styles.reactionText}>{sum(reactions)}</Text>}
        </View>
    )
};
export default observer(Reactions);

const styles = StyleSheet.create({
    reactionIconContainer: {
        height: 17,
        width: 17,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        backgroundColor: '#fff',
    },
    reactionIcon: {
        height: 15,
        width: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reactionText: {
        color: 'grey',
        fontSize: 12
    },
})