import { ZegoUIKitPrebuiltVideoConference } from '@zegocloud/zego-uikit-prebuilt-video-conference-rn';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function VideoConferencePage(props) {
  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltVideoConference
        appID={1215996187}
        appSign="a7ea1425b633ce0cdae53fbb5a502d1b36d4b17f181cfb43b3509e1040d4c6b7"
        userID="tech" // userID can be something like a phone number or the user id on your own user system.
        userName="phwrithish"
        conferenceID="ffdfddtgcghg" // conferenceID can be any unique string.
        config={{
          onLeave: () => {
            props.navigation.navigate('HomePage');
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
