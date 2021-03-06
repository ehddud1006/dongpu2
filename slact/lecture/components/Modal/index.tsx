import React, { FC, useCallback } from 'react';
import { Container, Header } from '@pages/Channel/styles';
import { CloseModalButton, CreateModal } from './styles';

interface Props {
    show: boolean;
    onCloseModal: () => void
}
{/* https://ehddud100677.tistory.com/350 */ }
const Modal: FC<Props> = ({ show, children, onCloseModal }) => {
    const stopPropagation = useCallback((e) => {
        e.stopPropagation();
    }, [])
    if (!show) {
        return null
    }
    return (
        <CreateModal onClick={onCloseModal}>
            <div onClick={stopPropagation}>
                <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
                {children}
            </div>
        </CreateModal>
    );
};

export default Modal;