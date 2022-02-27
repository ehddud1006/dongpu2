import React, { FC, useCallback } from 'react';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import gravatar from 'gravatar'
import { Redirect } from 'react-router';
import { Channels, Chats, Header, MenuScroll, ProfileImg, RightMenu, WorkspaceName, Workspaces, WorkspaceWrapper } from '@layouts/Workspace/styles';

const Workspace: FC = ({ children }) => {
    const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
    const onLogout = useCallback(() => {
        axios
            .post('http://localhost:3095/api/users/logout', null, {
                withCredentials: true,
            })
            .then(() => {
                // revalidate();
                mutate(false);
                // mutate('http://localhost:3095/api/users', false);
            });
    }, []);

    if (!data) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span>
                        <ProfileImg src={gravatar.url(data.nickname, { s: '28px', d: 'retro' })} alt={data.email}></ProfileImg>
                    </span>
                </RightMenu>
            </Header>

            <button onClick={onLogout}>로그아웃</button>
            <WorkspaceWrapper>
                <Workspaces>test</Workspaces>
                <Channels>
                    <WorkspaceName>
                        Slact
                    </WorkspaceName>
                    <MenuScroll>
                        Menu scroll
                    </MenuScroll>
                </Channels>
                <Chats>Chats</Chats>
            </WorkspaceWrapper>
            {/* {children} */}
        </div>
    );
};

export default Workspace;