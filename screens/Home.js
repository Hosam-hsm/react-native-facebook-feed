import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    View,
} from "react-native";
import { observer } from "mobx-react";
import { ItemSeperator, ListEmpty, Post } from "../components";
import { POSTS } from "../data"
import { useStore } from "../store";

const Home = ({ }) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [hasMoreToLoad, setHasMoreToLoad] = useState(true)
    const [offset, setOffset] = useState(1);
    const store = useStore()

    const handleLoadMore = () => {
        // setLoading(true)
        // setOffset(offset + 1)
        // store.getPosts( offset).then((response) => {
        //     if (response.length == 0) {
        //         setHasMoreToLoad(false)
        //     }
        //     setPosts([...comments, ...response]);
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
        //load posts from posts API and store in state.
        setTimeout(() => { setLoading(false) }, 2000) //for loading posts demo
    }, [])

    if (loading) {
        return <ActivityIndicator animating size="large" color={'grey'} />
    }

    return (
        <FlatList
            data={POSTS} //use data from state instead
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            ListEmptyComponent={ListEmpty}
            keyExtractor={(data) => data.id}
            ItemSeparatorComponent={ItemSeperator}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.5}
            // onEndReached={hasMoreToLoad ? handleLoadMore : null}
            renderItem={({ item }) => <Post
                showFullLines={false}
                post={item}
                images={item.items.map(item => item.image)}
                key={item.id} />}
        />
    )
};
export default observer(Home);

