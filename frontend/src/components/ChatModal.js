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
      className="w-11/12 h-[85vh] m-auto mt-20 bg-slate-200 p-4 md:w-1/2 md:ml-80 lg:w-[40vw] lg:ml-[35vw]  rounded-xl"
    >
      <div className='flex justify-between'>
      <h2 className='inline-block'>{user2Name}</h2>
      <button onClick={onRequestClose}>close</button>
      </div>
      <ChatComponent user2Id={user2Id}/>
    </Modal>
  );
};

export default ChatModal;
