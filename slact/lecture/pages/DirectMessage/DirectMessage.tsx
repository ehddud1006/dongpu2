import { Container } from '@pages/Channel/styles';
import { Header } from '@pages/SignUp/styles';
import React from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import gravatar from 'gravatar'
import fetcher from '@utils/fetcher';
import ChatBox from '@components/ChatBox/ChatBox';
import ChatList from '@components/ChatList/ChatList';
const DirectMessage = () => {
    const { workspace, id } = useParams<{ workspace: string; id: string }>();
    const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
    const { data: myData } = useSWR('/api/users', fetcher);

    if (!userData || !myData) {
        return null
    }
    return (
        <Container>
            <Header>
                <img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })}></img>
                <span>{userData.nickname}</span>
            </Header>
            <ChatList></ChatList>
            <ChatBox chat=""></ChatBox>
        </Container>
    );
};

export default DirectMessage;
