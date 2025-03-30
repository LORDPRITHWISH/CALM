// types/zegocloud.d.ts or src/zegocloud.d.ts
declare module '@zegocloud/zego-uikit-prebuilt-video-conference-rn' {
  import { ComponentType } from 'react';

  interface ZegoUIKitPrebuiltVideoConferenceProps {
    appID: number;
    appSign: string;
    userID: string;
    userName: string;
    conferenceID: string;
    config?: {
      onLeave?: () => void;
      // Add other config properties as needed
    };
  }

  const ZegoUIKitPrebuiltVideoConference: ComponentType<ZegoUIKitPrebuiltVideoConferenceProps>;

  export default ZegoUIKitPrebuiltVideoConference;
}
