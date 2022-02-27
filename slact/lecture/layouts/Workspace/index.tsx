import React, { FC, useCallback, useState } from 'react';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import gravatar from 'gravatar'
import loadable from '@loadable/component';
import { Redirect, Route, Switch } from 'react-router';
import { AddButton, Channels, Chats, Header, LogOutButton, MenuScroll, ProfileImg, ProfileModal, RightMenu, WorkspaceButton, WorkspaceName, Workspaces, WorkspaceWrapper } from '@layouts/Workspace/styles';
import Menu from '@components/Menu';
import { Link } from 'react-router-dom';
import { IUser } from '@typings/db';
import { Button, Input, Label } from '@pages/SignUp/styles';
import useInput from '@hooks/useinput';
import Modal from '@components/Modal';
import { toast } from 'react-toastify';
const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: FC = ({ children }) => {
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false)
    const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('')
    const [newUrl, onChangeNewUrl, setNewUrl] = useInput('')
    // data의 이름을 userData로 바꾼다.
    // useSWR<IUser | false>
    // 로그인 되어 있을 경우 | 안되어있는 경우
    const { data: userData, error, revalidate, mutate } = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher);
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

    const onCloseUserProfile = useCallback((e) => {
        e.stopPropagation();
        setShowUserMenu(false);
    }, []);

    const onCreateWorkspace = useCallback((e) => {
        e.preventDefault();
        {/* https://ehddud100677.tistory.com/350 */ }
        if (!newWorkspace || !newWorkspace.trim()) return;
        if (!newUrl || !newUrl.trim()) return;
        // console.log(newWorkspace)
        // console.log(newUrl)
        axios
            .post(
                'http://localhost:3095/api/workspaces',

                {
                    workspace: newWorkspace,
                    url: newUrl,
                },
                {
                    // 로그인된 상태인 것을 쿠키로 백에 전달
                    withCredentials: true,
                },
            )
            .then(() => {
                revalidate();
                setShowCreateWorkspaceModal(false);
                // state 값 초기화
                setNewWorkspace('');
                setNewUrl('');
            })
            .catch((error) => {
                console.dir(error);
                toast.error(error.response?.data, { position: 'bottom-center' });
            });
    }, [newWorkspace, newUrl])

    const onCloseModal = useCallback(() => {
        setShowCreateWorkspaceModal(false)
    }, [])

    const onClickUserProfile = useCallback(() => {
        // console.log('hi')
        setShowUserMenu((prev) => !prev)
    }, [])

    const onClickCreateWorkspace = useCallback(() => {
        setShowCreateWorkspaceModal(true)
    }, [])

    if (!userData) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    {/* 유저 프로필을 누를경우 */}
                    <span onClick={onClickUserProfile}>
                        <ProfileImg src={gravatar.url(userData.nickname, { s: '28px', d: 'retro' })} alt={userData.email}></ProfileImg>
                        {showUserMenu && (<Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onCloseUserProfile}>프로필메뉴
                            <ProfileModal>
                                <img src={gravatar.url(userData.nickname, { s: '36px', d: 'retro' })} alt={userData.nickname}></img>
                                <div>
                                    <span id="profile-name">{userData.nickname}</span>
                                    <span id="profile-active">Active</span>
                                </div>
                            </ProfileModal>
                            <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
                        </Menu>
                        )}
                    </span>
                </RightMenu>
            </Header>

            {/* <button onClick={onLogout}>로그아웃</button> */}
            <WorkspaceWrapper>
                {/* https://ehddud100677.tistory.com/350 */}
                <Workspaces>{userData?.Workspaces.map((ws) => {
                    return (
                        <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
                            <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
                        </Link>
                    )
                })}
                    <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
                </Workspaces>
                <Channels>
                    <WorkspaceName>
                        Slact
                    </WorkspaceName>
                    <MenuScroll>
                        Menu scroll
                    </MenuScroll>
                </Channels>
                <Chats>
                    <Switch>
                        <Route path="/workspace/channel" component={Channel} />
                        <Route path="/workspace/dm" component={DirectMessage} />
                    </Switch>
                </Chats>
            </WorkspaceWrapper>
            <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
                <form onSubmit={onCreateWorkspace}>
                    <Label id="workspace-label">
                        <span>워크스페이스 이름</span>
                        <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace}></Input>
                    </Label>
                    <Label id="workspace-url-label">
                        <span>워크스페이스 url</span>
                        <Input id="workspace" value={newUrl} onChange={onChangeNewUrl}></Input>
                    </Label>
                    <Button type="submit">생성하기</Button>
                </form>
            </Modal>
            {/* {children} */}
        </div>
    );
};

export default Workspace;