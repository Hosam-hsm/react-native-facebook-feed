import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, ImagePreview, PostDetails } from './screens';
import Store, { StoreProvider } from './store';
import { observer } from 'mobx-react';

const store = new Store()
const Stack = createStackNavigator();

function FacebookFeedNavigator() {
    return (
        <StoreProvider store={store}>
            <Stack.Navigator>
                <Stack.Screen
                    options={{ title: 'Feed' }}
                    name="FacebookFeedHome"
                    component={Home} />
                <Stack.Screen
                    name="FacebookFeedPostDetails"
                    options={({ route }) => ({ title: `${route.params.post.creator.name}'s Post` })}
                    component={PostDetails} />
                <Stack.Screen
                    options={{ title: '' }}
                    name="FacebookFeedImagePreview"
                    component={ImagePreview} />
            </Stack.Navigator>
        </StoreProvider>
    );
}

export default observer(FacebookFeedNavigator);