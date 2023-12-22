// ChatModal.js
import React from 'react';
import Modal from 'react-modal';
import ChatComponent from './chatComponent/ChatComponent';

const ChatModal = ({ isOpen, onRequestClose, user2Id, user2Name }) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Chat Modal"
      style={{
        content: {
          height: '85%',
          width: '50%',
          marginTop: '2%',
          marginLeft: '30%',
        },
      }}
    >
      <h2 style={{
        position: "fixed",

      }}>{user2Name}</h2>
      <button style={
        {position: "fixed",
        right: "20%"}
      } onClick={onRequestClose}>close</button>
      <ChatComponent user2Id={user2Id}/>
    </Modal>
  );
};

export default ChatModal;
