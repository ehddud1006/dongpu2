import React, { FC, useCallback } from 'react';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Header } from '@layouts/Workspace/styles';

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
            <Header>test</Header>
            <button onClick={onLogout}>로그아웃</button>
            {children}
        </div>
    );
};

export default Workspace;