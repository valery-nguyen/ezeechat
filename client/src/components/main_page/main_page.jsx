import React from "react";
import Nav from '../Nav';
import ChannelIndex from '../channels/ChannelIndex';
import MainChat from '../messages/main_chat';
import DirectMessageIndex from './../direct_messages/direct_messages_index';

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <Nav />
        <ChannelIndex />
        <DirectMessageIndex />
      </div>
    )
  }
};

export default MainPage; 