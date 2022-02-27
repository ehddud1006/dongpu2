import React, { VFC, useCallback, useState } from 'react';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import gravatar from 'gravatar'
import loadable from '@loadable/component';
import { Redirect, Route, Switch, useParams } from 'react-router';
import { AddButton, Channels, Chats, Header, LogOutButton, MenuScroll, ProfileImg, ProfileModal, RightMenu, WorkspaceButton, WorkspaceModal, WorkspaceName, Workspaces, WorkspaceWrapper } from '@layouts/Workspace/styles';
import Menu from '@components/Menu';
import { Link } from 'react-router-dom';
import { IChannel, IUser } from '@typings/db';
import { Button, Input, Label } from '@pages/SignUp/styles';
import useInput from '@hooks/useinput';
import Modal from '@components/Modal';
import { toast } from 'react-toastify';
import CreateChannelModal from '@components/CreateChannelModal/CreateChannelModal';
import InviteWorkspaceModal from '@components/InviteWorkspaceModal/InviteWorkspaceModal';
import InviteChannelModal from '@components/InviteChannelModal/InviteChannelModal';
import DMList from '@components/DMList/DMList';
const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

// children 이 필요없다면 VFC 필요하면 FC
const Workspace: VFC = () => {
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false)
    const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('')
    const [newUrl, onChangeNewUrl, setNewUrl] = useInput('')
    const [showWorkspaceModal, setShowWorkspaceModal] = useState(false)
    const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
    const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
    // data의 이름을 userData로 바꾼다.
    // useSWR<IUser | false>
    // 로그인 되어 있을 경우 | 안되어있는 경우
    const { data: userData, error, revalidate, mutate } = useSWR<IUser | false>('/api/users', fetcher);
    const { workspace } = useParams<{ workspace: string }>()
    // 삼항연산자를 사용해서 로그인이 된 상태라면 요청을 보내고 아니라면 null
    const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);
    const { data: memberData } = useSWR<IUser[]>(userData ? `/api/workspaces/${workspace}/members` : null, fetcher);

    const onLogout = useCallback(() => {
        axios
            .post('/api/users/logout', null, {
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
                '/api/workspaces',

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
        setShowCreateChannelModal(false)
    }, [])

    const onClickUserProfile = useCallback(() => {
        // console.log('hi')
        setShowUserMenu((prev) => !prev)
    }, [])

    const onClickCreateWorkspace = useCallback(() => {
        setShowCreateWorkspaceModal(true)
    }, [])

    const toggleWorkspaceModal = useCallback(() => {
        console.log('hh')
        setShowWorkspaceModal((prev) => !prev)
    }, [])

    const onClickAddChannel = useCallback(() => {
        setShowCreateChannelModal(true);
    }, []);

    const onClickInviteWorkspace = useCallback(() => {
        setShowInviteWorkspaceModal(true);
    }, []);


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
                    <WorkspaceName onClick={toggleWorkspaceModal}>
                        Slact
                    </WorkspaceName>
                    <MenuScroll>
                        <Menu show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal} style={{ top: 95, left: 80 }}>
                            <WorkspaceModal>
                                <h2>Sleact</h2>
                                <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
                                <button onClick={onClickAddChannel}>채널 만들기</button>
                                <button onClick={onLogout}>로그아웃</button>
                            </WorkspaceModal>
                        </Menu>
                        {/* <ChannelList}></ChannelList> */}
                        <DMList ></DMList>
                        {channelData?.map((v) => (<div>{v.name}</div>))}
                    </MenuScroll>
                </Channels>
                <Chats>
                    <Switch>
                        <Route path="/workspace/:workspace/channel/:channel" component={Channel} />
                        <Route path="/workspace/:workspace/dm/:id" component={DirectMessage} />
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
            <CreateChannelModal
                show={showCreateChannelModal}
                onCloseModal={onCloseModal}
                setShowCreateChannelModal={setShowCreateChannelModal}
            />
            <InviteWorkspaceModal
                show={showInviteWorkspaceModal}
                onCloseModal={onCloseModal}
                setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
            />
            <InviteChannelModal
                show={showInviteChannelModal}
                onCloseModal={onCloseModal}
                setShowInviteChannelModal={setShowInviteChannelModal}
            />
            {/* {children} */}
        </div>
    );
};

export default Workspace;