import { observer } from "mobx-react";
import React, { useEffect, useRef } from "react";
import {
    View,
    StyleSheet,
    Modal,
    Animated,
    PanResponder,
} from "react-native";
import { SCREEN_HEIGHT } from "../../constants";

const BottomSheet = ({ visible, children, onDismiss, scrollY }) => {

    const panY = useRef(new Animated.Value(SCREEN_HEIGHT)).current

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: (event, gs) => false,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: Animated.event([
            null, { dy: panY }
        ], { useNativeDriver: false }),
        onPanResponderRelease: (e, gs) => {
            if (gs.dy > 0 && gs.vy > 0) {
                return closeAnim.start(() => onDismiss());
            }
            return resetPositionAnim.start();
        },
    })).current;

    const resetPositionAnim = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
    })

    const closeAnim = Animated.timing(panY, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: false,
    })

    const top = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    useEffect(() => {
        if (visible)
            resetPositionAnim.start();
    }, [visible])

    const handleDismiss = () => {
        closeAnim.start(() => onDismiss());
    }

    return (
        <Modal
            animated
            visible={visible}
            transparent
            onRequestClose={handleDismiss}>
            <View style={styles.overlay}>
                <Animated.View {...panResponders.panHandlers} style={[styles.container, { top }]}>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    )
};
export default observer(BottomSheet);

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 12,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    },
})