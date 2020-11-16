import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { observer } from "mobx-react";
import EmojiBoard from 'react-native-emoji-board'
import moment from "moment";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BLUE, BORDERCOLOR, SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";
import { COMMENTS } from "../data";
import BottomSheet from "./BottomSheet";
import Reactions from "./Reactions";
import { useStore } from "../store";

const ListEmptyComponent = () => {
    return (
        <View style={styles.emptyContainer}>
            <Text style={[styles.lightText, { fontSize: 16 }]}>No comments on this post yet. Be the first one to comment.</Text>
        </View>
    )
}

const Comment = ({ item }) => {
    const { name, image, createdAt, comment, replies, reactions } = item
    return (
        <View style={styles.commentContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: image }} />
            </View>
            <View style={styles.commentSection}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.comment}>{comment}</Text>
                <View style={styles.row}>
                    <Text numberOfLines={1} style={styles.lightText} >{moment(createdAt).format('MMMM DD')} at {moment(createdAt).format('h:mm a')}</Text>
                    <Text style={styles.lightText}>Like</Text>
                    <Reactions reactions={reactions} />
                </View>
                <Text style={styles.lightText}>Reply</Text>
            </View>
        </View>
    )
}

const Comments = ({ post, visible, onDismiss }) => {
    const store = useStore()
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
    const [offset, setOffset] = useState(1);
    const [scrollY, setScrollY] = useState(0)
    const [text, setText] = useState('')
    const [show, setShow] = useState(false);

    const handleLoadMore = () => {
        // setLoading(true)
        // setOffset(offset + 1)
        // store.getComments(post.id, offset).then((response) => {
        //     if (response.length == 0) {
        //         setHasMoreToLoad(false)
        //     }
        //     setComments([...comments, ...response]);
        //     setLoading(false);
        // })
        //     .catch((error) => {
        //         setLoading(false);
        //     });
    };

    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={{ height: 40, width: '100%' }}>
                <ActivityIndicator animating size="small" color={'grey'} />
            </View>
        );
    };

    useEffect(() => {
        //load comments from comments API and store in state. Pass post.id as argument to the API.
        setTimeout(() => { setLoading(false) }, 2000) //for loading comments demo
    }, [post.id])

    const handleScroll = (event) => {
        setScrollY(event.nativeEvent.contentOffset.y);
    } // for enabling and disabling the pan handlers in the bottom sheet

    const onPressSend = () => {
        if (text) {
            alert('send')
            setText('')
        }
        else show(true)
    }

    const onPressEmoji = emoji => {
        setText(emoji)
    };

    return (
        <BottomSheet
            visible={visible}
            onDismiss={onDismiss}
            scrollY={scrollY}
        >
            {
                loading ?
                    <View style={styles.container}>
                        <ActivityIndicator size="large" animated={true} color={'grey'} />
                    </View>
                    :
                    <FlatList
                        keyboardShouldPersistTaps={'always'}
                        onScroll={handleScroll}
                        data={COMMENTS} //use data from state instead
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        style={styles.container}
                        keyExtractor={(data) => data.id}
                        listEmptyComponent={ListEmptyComponent}
                        ListFooterComponent={renderFooter}
                        onEndReachedThreshold={0.5}
                        // onEndReached={hasMoreToLoad ? handleLoadMore : null}
                        renderItem={({ item }) => <Comment item={item} key={item.id} />}
                    />
            }

            <View style={styles.placeholderContainer}>
                <MaterialCommunityIcons
                    name="camera-outline"
                    size={28}
                    color="black"
                    onPress={() => alert('Camera')}
                />
                <TextInput
                    autoFocus
                    placeholder={'Comment...'}
                    placeholderTextColor={'grey'}
                    multiline
                    value={text}
                    onChangeText={setText}
                    style={styles.placeholder}
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onPressSend}
                >
                    {
                        text ?
                            <MaterialCommunityIcons name="send" size={28} color={BLUE} />
                            :
                            <MaterialIcons name="emoji-emotions" size={28} color={"lightgrey"} />
                    }
                </TouchableOpacity>
                <EmojiBoard showBoard={show} onClick={onPressEmoji} />
            </View>
        </BottomSheet>
    )
};
export default observer(Comments);

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    container: {
        height: SCREEN_HEIGHT - 15,
        backgroundColor: '#fff',
        padding: 10
    },
    commentContainer: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    commentSection: {
        backgroundColor: '#ebecf0',
        padding: 8,
        borderRadius: 5,
        marginLeft: 5,
        flex: 1,
        overflow: 'hidden'
    },
    imageContainer: {
        height: 40,
        width: 40,
        borderRadius: 20,
        overflow: 'hidden'
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    comment: {
        marginTop: 5,
        lineHeight: 20
    },
    lightText: {
        color: 'grey',
        fontSize: 13,
        fontWeight: '600'
    },
    row: {
        flexDirection: 'row',
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    placeholderContainer: {
        borderTopWidth: 1,
        borderColor: BORDERCOLOR,
        padding: 15,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    placeholder: {
        width: SCREEN_WIDTH - 100,
        borderRadius: 20,
        backgroundColor: '#ebecf0',
        padding: 8,
        paddingHorizontal: 10
    }
})