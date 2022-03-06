import React, { useCallback } from 'react';
import { Container, Header } from '@pages/Channel/styles';
import useInput from '@hooks/useinput';
import ChatList from '@components/ChatList/ChatList';
import ChatBox from '@components/ChatBox/ChatBox';
const Channel = () => {
  const [chat, onChangeChat, setChat] = useInput('');
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    setChat('');
  }, []);
  return (
    <Container>
      <Header>채널!</Header>
      <ChatList></ChatList>
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  );
};

export default Channel;
