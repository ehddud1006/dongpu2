import { Container } from '@pages/Channel/styles';
import { Header } from '@pages/SignUp/styles';
import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import gravatar from 'gravatar'
import fetcher from '@utils/fetcher';
import ChatBox from '@components/ChatBox/ChatBox';
import ChatList from '@components/ChatList/ChatList';
import useInput from '@hooks/useinput';
import axios from 'axios';
import { IDM } from '@typings/db';
import useSocket from '@hooks/useSocket';
const DirectMessage = () => {
    const { workspace, id } = useParams<{ workspace: string; id: string }>();
    const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
    const { data: myData } = useSWR('/api/users', fetcher);
    const [chat, onChangeChat, setChat] = useInput('')
    const { data: chatData, mutate: mutateChat, revalidate } = useSWR<IDM[]>(
        `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`,
        fetcher,
    );
    const [socket] = useSocket(workspace);
    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        if (chat?.trim()) {
            axios
                .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
                    content: chat,
                })
                .then(() => {
                    revalidate();
                    setChat('')
                })
                .catch(console.error);
        }
        console.log('submit')
    }, [chat]);
    if (!userData || !myData) {
        return null;
    }
    return (
        <Container>
            <Header>
                <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })}></img>
                <span>{userData.nickname}</span>
            </Header>
            <ChatList chatData={chatData}></ChatList>
            <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
        </Container>
    );
};

export default DirectMessage;
