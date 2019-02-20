import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/AntDesign';
import videPicker from '../screen/videPicker';
import VideoPlayer from '../screen/VideoPlayer'
import Search from "../screen/Search";
import Notification from "../screen/Notification";
// import Roadsideassistance from '../screen/Roadsideassistance'
const bottomtabstacknavigation = createBottomTabNavigator({
    Search: Search,
    Video: videPicker,
    Notification: Notification

}, {
    initialRouteName:"Video",
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Video') {
                    iconName = `pluscircleo`;
                } else if (routeName === 'Search') {
                    iconName = `search1`;
                }
                else if (routeName === 'Notification') {
                    iconName = `bells`;
                }
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
);

export default createAppContainer(bottomtabstacknavigation);