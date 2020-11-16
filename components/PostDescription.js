import { observer } from "mobx-react";
import React, { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

const PostDescription = forwardRef(({ desc, showFull }, ref) => {
    const [textShown, setTextShown] = useState(false);
    const [lengthMore, setLengthMore] = useState(false);

    useImperativeHandle(
        ref,
        () => ({
            toggleNumberOfLines() {
                setTextShown(!textShown);
            }
        }),
    )

    const onTextLayout = useCallback(e => {
        setLengthMore(e.nativeEvent.lines.length >= 3);
    }, []);

    const toggleNumberOfLines = () => {
        setTextShown(!textShown);
    }

    if (showFull) {
        return (
            <View style={styles.mainContainer}>
                <Text
                    style={{ lineHeight: 20 }}>{desc}</Text>
            </View>
        )
    }

    else return (
        <View style={styles.mainContainer}>
            <Text
                onTextLayout={onTextLayout}
                numberOfLines={textShown ? undefined : 3}
                style={{ lineHeight: 20 }}>{desc}</Text>
            {
                lengthMore ? <Text
                    onPress={toggleNumberOfLines}
                    style={{ marginVertical: textShown ? 0 : 5, color: 'grey', fontWeight: '500' }}>{textShown ? '' : '...See more'}</Text>
                    : null
            }
        </View>
    )
})

export default observer(PostDescription);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})