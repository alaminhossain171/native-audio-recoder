import React, {Component} from 'react';
import {Text, View, Button, TouchableOpacity, Platform} from 'react-native';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// const audioRecorderPlayer = new AudioRecorderPlayer();
const audioRecorderPlayer = new AudioRecorderPlayer();
export class ClassRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      seconds: 10,
      check: false,
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
  }

  onStartRecord = async () => {
  
    const result = await this.audioRecorderPlayer.startRecorder();
    this.audioRecorderPlayer.addRecordBackListener(e => {
      console.log(e.currentPosition)
      this.setState({
        recordSecs: e.currentPosition,
     

        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
      });
      return;
    });
    console.log('uri is:', result);
    setTimeout(this.onStopRecord,5000)
  };

  //========== main onRecord function========//

  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
    });
    console.log(result);
  };

  onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await this.audioRecorderPlayer.startPlayer();
    console.log(msg);
    this.audioRecorderPlayer.addPlayBackListener(e => {
      this.setState({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.currentPosition),
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };
  onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  };
  onStopPlay = async () => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#EFE5E6',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'coral',
            height: 150,
            width: 150,
            justifyContent: 'center',
            borderRadius: 100,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
            Time:{this.state.recordTime}
          </Text>
        </View>
        <View style={{margin: 10}}>
          <Button title="Record" onPress={() => this.onStartRecord()} />
        </View>

        <Button title="Stop" onPress={() => this.onStopRecord()} />

        <View
          style={{
            backgroundColor: 'coral',
            height: 150,
            width: 150,
            justifyContent: 'center',
            borderRadius: 100,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
            {this.state.playTime} / {this.state.duration}
          </Text>
        </View>

        <Button title="Play" onPress={() => this.onStartPlay()} />
        <Button title="Pause" onPress={() => this.onPausePlay()} />
        <Button title="Stop" onPress={() => this.onStopPlay()} />
      </View>
    );
  }
}

export default ClassRecord;
