import { observer } from "mobx-react";
import React, { useEffect, useRef } from "react";
import {
    FlatList,
} from "react-native";
import { ItemSeperator, Post } from "../components";
import { useStore } from "../store";

const PostDetails = ({ route }) => {
    const { post, index, } = route.params;
    const store = useStore()
    const flatlistRef = useRef();

    const getItemLayout = (data, index) => (
        { length: 400, offset: 400 * index, index }
    )

    useEffect(() => {
        flatlistRef?.current?.scrollToIndex({ animated: false, index: index })
    }, [index])

    return (
        <FlatList
            ref={flatlistRef}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Post post={post} />} //show desc only
            getItemLayout={getItemLayout}
            data={post.items}
            style={{ flex: 1 }}
            keyExtractor={(data) => data.id}
            ItemSeparatorComponent={ItemSeperator}
            renderItem={({ item }) => {
                return <Post
                    preview
                    post={item}
                    images={[item.image]}
                    key={item.id} />
            }}
        />
    )
};
export default observer(PostDetails);

