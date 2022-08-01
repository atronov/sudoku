import React, {FC, Fragment} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

type SnackBarProps = {
    onClose?: () => void;
    isOpen?: boolean;
    placeholderElem?: HTMLElement | null;
    children?: React.ReactNode;
};

const zIndex = 1;

export const SnackBarDivider = styled.hr`
    margin: 8px -8px;
    height: 1px;
    opacity: 0.1;
    background: #000;
    border: none;
`;

const Overlay = styled.div<{isHidden: boolean}>`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: ${zIndex};
    background: rgba(0, 0, 0, 0.4);
    backface-visibility: hidden;
    transition: opacity 0.2s;
    ${({isHidden}) => isHidden ? `
        opacity: 0;
        pointer-events: none;
    ` : ''}
`;

const Content = styled.div<{isHidden: boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    border-radius: 16px 16px 0 0;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    color: #000;
    padding: 18px 8px 24px;
    z-index: ${zIndex};
    transform: translateY(-100%);
    transition: transform 0.2s;
    ${({isHidden}) => isHidden ? `
        pointer-events: none;
        transform: translateY(0);
        transition: transform 0.2s;
        box-shadow: none;
    ` : ''}
`;

const Bar = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: ${zIndex};
    user-select: none;
    backface-visibility: hidden;
`;

export const SnackBar: FC<SnackBarProps> = (props) => {
    const {isOpen = false, children, onClose, placeholderElem = document.body} = props;

    if (!placeholderElem) {
        return null;
    }

    return ReactDOM.createPortal(
        <Fragment key="snack-bar">
            <Overlay  isHidden={!isOpen} onClick={onClose}  />
            <Bar>
                <Content isHidden={!isOpen}>{children}</Content>
            </Bar>
        </Fragment>,
        placeholderElem,
    );
};
