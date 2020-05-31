import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';
import styles from "./videoPlayScreenStyle";
import serverurl from '../../../config/const/serverurl';

class videoPlayScreen extends Component{

    constructor() {
        super();
        this.state = {
            video: { width: undefined, height: undefined, duration: undefined },
            thumbnailUrl: undefined,
            videoUrl: undefined,
            language: ''
        };
    }

    getLanguage = (locale) => {
        let lang = ''
        switch(locale){
            case 'cn':
                lang = 'Chinese';
                break;
            case 'ar':
                lang = 'Arabic';
                break;
            case 'ge':
                lang = 'German';
                break;
            case 'po':
                lang = 'Portuguese';
                break;
            case 'ru':
                lang = 'Russian';
                break;
            case 'sp':
                lang = 'Spanish';
                break;
            case 'jp':
                lang = 'Japanese';
                break;
            default:
            case 'en':
                lang = 'English';
                break;
        }
        return lang
    }

    setLanguage = (lang, data) => {
        data.map((d, i)=>{
            if (d.name.includes(lang)) {
                this.setState({ language: d.language });
            }
        })
    }

    fetchVimeoVideo = async () => {
        const url = `https://api.vimeo.com/videos/${this.props.video_url}/texttracks`
        const response = await global.fetch(
            url, {
                method: 'get',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + serverurl.vimeoToken
                }
            }
        );
        const jsonResponse = await response.json();
        const { data } = jsonResponse;
        if (response.status != 200) {
            console.log(response.status)
        }
        this.setLanguage(this.getLanguage(this.props.intlData.locale), data)
    };

    onBack(){
        Actions.pop();
    }

    componentDidMount(){
        Orientation.lockToLandscape();
        this.fetchVimeoVideo()
        console.log(`https://player.vimeo.com/video/${this.props.video_url}/config`)
        global.fetch(`https://player.vimeo.com/video/${this.props.video_url}/config`)
        .then(res => res.json())
        .then(res => this.setState({
            thumbnailUrl: res.video.thumbs['640'],
            videoUrl: res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
            video: res.video,
        }));
    }

    componentWillUnmount(){
        Orientation.lockToPortrait();
    }

    render(){
        // const {video_url} = this.props;
        console.log(this.state.videoUrl)
        return(
            <View style={styles.container}>
                <VideoPlayer
                    source={{ uri: this.state.videoUrl }}
                    onBack={()=>this.onBack()}
                    onEnd={()=>this.onBack()}
                    selectedTextTrack = {{
                        type: "language",
                        value: this.state.language
                    }}
                    ignoreSilentSwitch = "ignore"
                    ref={(ref) => {
                        this.player = ref
                    }}
                    style={styles.backgroundVideo}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
  intlData: state.IntlReducers
})

export default connect(mapStateToProps, null)(videoPlayScreen);