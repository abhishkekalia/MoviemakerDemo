import React from 'react';
import {
    AppRegistry,
    Image,
    PixelRatio,
    StyleSheet,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import VideoPlayer from './VideoPlayer';

var isAndroid = Platform.OS === 'android'
export default class videPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoSource: null,
        }
        this.selectVideoTapped = this.selectVideoTapped.bind(this);
    }
    selectVideoTapped() {
        const options = {
            title: 'Video Picker',
            takePhotoButtonTitle: 'Take Video...',
            // chooseFromLibraryButtonTitle:"",
            durationLimit: 5,
            allowsEditing: true,
            mediaType: 'video',
            videoQuality: 'medium',
            storageOptions: {
                // skipBackup: false,
                path: 'video',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled video picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                var responsedata = {};
                let url = response.uri;
                // let path = (Platform.OS === 'ios')? url.replace(/^file:\/\//, '') : response.path

                let path = (Platform.OS === 'ios') ? url : response.path
                responsedata.fileName = response.fileName;
                responsedata.origURL = response.origURL;
                responsedata.timestamp = response.timestamp;
                responsedata.uri = path
                this.setState({
                    videoSource: responsedata,
                });
                console.log("responsedata", responsedata)
            }
        });
    }
    closeVideoScreen(){
        this.setState({
            videoSource:null
        })
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.videoSource
                        ?
                        <View style={{ flex: 1 }}>
                            <VideoPlayer videoSource={this.state.videoSource} closeVideoScreen={this.closeVideoScreen.bind(this)}/>
                        </View>
                        :
                        <View style={{ flex: 1, justifyContent:"center", alignItems:"center", backgroundColor:"#FFF" }}>
                        <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
                            <View style={[styles.avatar, styles.avatarContainer]}>
                                <Text>Select Video</Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150,
    },
});