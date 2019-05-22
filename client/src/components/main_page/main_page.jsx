import React from "react";
import Nav from '../Nav';
import ChannelIndex from '../channels/ChannelIndex';
import MainChat from '../messages/main_chat';

class MainPage extends React.Component {


  render() {
    return (
      <div>
        <Nav />
        <ChannelIndex />
      </div>
    )
  }
};

export default MainPage; 