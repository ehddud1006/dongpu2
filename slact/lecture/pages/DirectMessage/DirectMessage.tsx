import { Container } from '@pages/Channel/styles';
import { Header } from '@pages/SignUp/styles';
import React, { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import useSWR, { useSWRInfinite } from 'swr';
import gravatar from 'gravatar'
import fetcher from '@utils/fetcher';
import ChatBox from '@components/ChatBox/ChatBox';
import ChatList from '@components/ChatList/ChatList';
import useInput from '@hooks/useinput';
import axios from 'axios';
import { IDM } from '@typings/db';
import useSocket from '@hooks/useSocket';
import makeSection from '@utils/makeSection';
import Scrollbars from 'react-custom-scrollbars';
const DirectMessage = () => {
    const { workspace, id } = useParams<{ workspace: string; id: string }>();
    const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
    const { data: myData } = useSWR('/api/users', fetcher);
    const [chat, onChangeChat, setChat] = useInput('')
    const { data: chatData, mutate: mutateChat, revalidate, setSize } = useSWRInfinite<IDM[]>(
        (index) => `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${index + 1}`,
        fetcher,
    );
    const isEmpty = chatData?.[0]?.length === 0;
    const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;
    const scrollbarRef = useRef<Scrollbars>(null)
    const [socket] = useSocket(workspace);
    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        if (chat?.trim() && chatData) {
            const savedChat = chat;
            mutateChat((prevChatData) => {
                prevChatData?.[0].unshift({
                    id: (chatData[0][0]?.id || 0) + 1,
                    content: savedChat,
                    SenderId: myData.id,
                    Sender: myData,
                    ReceiverId: userData.id,
                    Receiver: userData,
                    createdAt: new Date(),
                });
                return prevChatData;
            }, false)
                .then(() => {
                    setChat('');
                    scrollbarRef.current?.scrollToBottom();
                });
            axios
                .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
                    content: chat,
                })
                .then(() => {
                    revalidate();
                    // setChat('')
                    // scrollbarRef.current?.scrollToBottom();
                })
                .catch(console.error);
        }
        console.log('submit')
    }, [chat, chatData, myData, userData, workspace, id]);

    // 로딩 시 스크롤바 제일 아래로
    useEffect(() => {
        if (chatData?.length === 1) {
            setTimeout(() => {
                scrollbarRef.current?.scrollToBottom();
            }, 100);
        }
    }, [chatData]);

    if (!userData || !myData) {
        return null;
    }

    const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

    return (
        <Container>
            <Header>
                <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })}></img>
                <span>{userData.nickname}</span>
            </Header>
            <ChatList chatSections={chatSections} ref={scrollbarRef} setSize={setSize} isReachingEnd={isReachingEnd} />
            <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
        </Container>
    );
};

export default DirectMessage;
