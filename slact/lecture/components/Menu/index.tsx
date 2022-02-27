import React, { CSSProperties, FC, useCallback } from 'react';
import { Container, Header } from '@pages/Channel/styles';
import { CloseModalButton, CreateMenu } from './styles';

// Props 타입을 선언해주어야한다.
interface Props {
    show: boolean;
    onCloseModal: () => void;
    style: CSSProperties;
    // closeButton만 ? 선택적 문법을 사용한 이유는
    // 상위 컴포넌트에서 props를 내려줄때 closeButton은 안내려줄수도 있기때문에 ? 로
    // type을 정해준 것이다.
    closeButton?: boolean
}
const Menu: FC<Props> = ({ children, style, show, onCloseModal, closeButton }) => {
    const stopPropagation = useCallback((e) => {
        e.stopPropagation
    }, [])
    return (
        <CreateMenu onClick={onCloseModal}>
            <div style={style} onClick={stopPropagation}>
                {/* &times는 x 표시를 뜻한다. */}
                {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
                {children}
            </div>
        </CreateMenu>
    );
};
Menu.defaultProps = {
    closeButton: true
}

export default Menu;
