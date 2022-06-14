import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

const UpdatedRecord = () => {
  const [status, setStatus] = useState();
  const [seconds, setSeconds] = React.useState(10);
    const [check,setCheck]=React.useState(false)

    React.useEffect(()=>{
        if(check===true){
            timer()
          }
    })
    function timer(){
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
          } else {
            setSeconds('BOOOOM! TIME UP !');
          }
      }
  const onStartRecord = async () => {
    const path = Platform.select({
      ios: 'hello.m4a',
      android: 'sdcard/shohan.mp3', // should give extra dir name in android. Won't grant permission to the first level of dir.
    });
    const result = await audioRecorderPlayer.startRecorder(path);
    await audioRecorderPlayer.startRecorder();

    audioRecorderPlayer.addRecordBackListener(e => {
      console.log('Recording . . . ', e.currentPosition);
      setStatus('recording');
      return;
    });
    console.log('result is :', result);
    setCheck(true)
    setTimeout(onStopRecord,10000);
  };

  const onStopRecord = async () => {
    const audio = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setStatus('Stoped');
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      console.log(e);
      setStatus('Playing');
      return;
    });
  };

  const onStopPlay = async () => {
    console.log('onStopPlay');
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{status && status}</Text>
      <TouchableOpacity
        onPress={onStartRecord}
        style={{backgroundColor: 'yellow', margin: 10, padding: 10}}>
        <Text>Start</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onStopRecord}
        style={{backgroundColor: 'yellow', margin: 10, padding: 10}}>
        <Text>Stop</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onStartPlay}
        style={{backgroundColor: 'yellow', margin: 10, padding: 10}}>
        <Text>play</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onStopPlay}
        style={{backgroundColor: 'yellow', margin: 10, padding: 10}}>
        <Text>stop play</Text>
      </TouchableOpacity>
      <Text>{seconds}</Text>
    </View>
  );
};
export default UpdatedRecord;
