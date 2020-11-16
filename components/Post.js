// Used in both the home screen and post details screen conditionally

import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from 'moment';
import ImageGrid from "./ImageGrid";
import PostDescription from "./PostDescription";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ReactionsButton from "./ReactionsButton";
import { observer } from "mobx-react";
import { useStore } from "../store";
import Reactions from "./Reactions";

const Post = ({ post, images, preview }) => {
    const { reactions, comments, shares } = post
    const navigation = useNavigation()
    const route = useRoute();
    const store = useStore()
    const descRef = useRef()

    const onPressImage = (url, index, event) => {
        preview ? navigation.navigate('FacebookFeedImagePreview', { images }) //To preview a selected single image 
            :
            navigation.navigate('FacebookFeedPostDetails', { post, index }) //index is passed to scroll to the specific image on mount
    }

    const onPressComments = () => {
        alert('comments')
    }

    const onPressShare = () => {
        alert('Share')
    }

    return (
        <>
            <View style={styles.post}>
                {
                    post.creator ? (
                        <View style={styles.header}>
                            <View style={[styles.row, { justifyContent: 'space-between' }]}>
                                <TouchableOpacity
                                    onPress={() => { alert('profile') }}
                                    style={styles.row}>
                                    <Image source={{ uri: post.creator.image }} style={styles.creatorImage} />
                                    <View style={{ marginHorizontal: 10 }}>
                                        <View style={styles.row}>
                                            <Text numberOfLines={1} style={styles.boldText}>{post.creator.name}</Text>
                                            {
                                                post.creator.verified && <Text style={styles.creatorName}> ✅</Text>
                                            }
                                        </View>
                                        <View style={styles.row}>
                                            <Text numberOfLines={1} style={styles.lightText} >{moment(post.createdAt).format('MMMM DD')} at {moment(post.createdAt).format('h:mm a')}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => alert('Options')}
                                    style={styles.dots}>
                                    <MaterialCommunityIcons name="dots-horizontal" size={28} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : null
                }

                {
                    post.desc ? <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => descRef.current.toggleNumberOfLines()}
                        style={styles.descriptionContainer}>
                        <PostDescription
                            desc={post.desc}
                            ref={descRef}
                            showFull={route.name === 'FacebookFeedPostDetails'}
                        />
                    </TouchableOpacity> : null
                }

                <View style={{ height: images ? 340 : 40 }}>
                    {/* 40 is the minimum height for showing the reactions on a post without an image */}
                    {images ? <ImageGrid
                        style={{ height: 300 }}
                        images={images}
                        onPress={onPressImage}
                    /> : null}

                    <View style={styles.reactionsContainer} >
                        <Reactions reactions={reactions} />
                        <View style={styles.row}>
                            {comments != 0 && <Text style={styles.commentsText}>{comments} Comments</Text>}
                            {shares != 0 && <Text style={styles.sharesText}>{shares} Shares</Text>}
                        </View>
                    </View>
                </View>

                <View style={styles.bottomBorder} />
                <View style={styles.buttonsContainer}>
                    <ReactionsButton />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.buttonContainer}
                        onPress={onPressComments}>
                        <MaterialIcons name="chat-bubble-outline" size={25} color="grey" />
                        <Text style={styles.buttonText}>Comment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.buttonContainer}
                        onPress={onPressShare}>
                        <MaterialCommunityIcons name="share-outline" size={25} color="grey" />
                        <Text style={styles.buttonText}>Share</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
export default observer(Post);

const styles = StyleSheet.create({
    post: {
        width: '100%',
        backgroundColor: '#fff'
    },
    header: {
        padding: 15,
        paddingVertical: 8,
        backgroundColor: '#fff'
    },
    dots: {
        paddingVertical: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    lightText: {
        color: 'grey'
    },
    creatorImage: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    boldText: {
        fontWeight: 'bold',
    },
    descriptionContainer: {
        marginBottom: 5,
        paddingHorizontal: 15,
        backgroundColor: '#fff'
    },
    image: {
        height: 300,
        width: '100%',
    },
    reactionsContainer: {
        top: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15
    },
    sharesText: {
        marginLeft: 10,
        color: 'grey'
    },
    commentsText: {
        color: 'grey'
    },
    bottomBorder: {
        height: 1,
        backgroundColor: '#ebecf0',
        marginHorizontal: 15
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15
    },
    buttonContainer: {
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: 'grey',
        marginLeft: 8,
        fontSize: 14,
        fontWeight: 'bold'
    },
})