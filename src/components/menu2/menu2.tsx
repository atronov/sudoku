import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {UserDifficulty} from '../../model/task-generaor';
import {SnackBar, SnackBarItem} from '../snack-bar'
import {matchPath, useNavigate, useLocation} from "react-router-dom";

type MenuItemType = {
    children?: MenuItemType[],
    title: string,
    onClick?: () => void,
    to?: string,
};

type Props = {
    isOpen: boolean,
    onStateChange: (isOpen: boolean) => void,
    onNewGame: (difficultyMode: UserDifficulty) => void,
    onRetry: () => void,
    menuState: 'default' | 'new_game',
};

export function Menu2({isOpen, onStateChange, onNewGame, onRetry, menuState}: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const menuStructure: MenuItemType[] = useMemo(() => {
        const newGameStructure: MenuItemType[] = [
            {title: 'Easy', onClick: () => onNewGame('easy')},
            {title: 'Normal', onClick: () => onNewGame('mid')},
            {title: 'Hard', onClick: () => onNewGame('hard')},
            {title: 'Expert', onClick: () => onNewGame('expert')},
        ].map(item => ({...item, to: '/'}));
        const totalStructure: MenuItemType[] = [
            {
                title: 'Resume',
                to: '/',
            },
            {
                title: "Retry",
                onClick: () => onRetry(),
            },
            {
                title: 'New game',
                children: newGameStructure,
            },
            // these pages are not supported yet
            // {title: 'Settings', to: '/settings'},
            // {title: 'Records', to: '/records'},
        ];
        return menuState === 'new_game' ? newGameStructure : totalStructure;
    },[onNewGame, menuState]);
    const [currentChildren, setChildren] = useState(menuStructure);
    useEffect(() => {
        setChildren(menuStructure);
    }, [menuState]);
    const handleToOrigin = useCallback(() => {
        setTimeout(() => setChildren(menuStructure), 250);
    }, [menuStructure]);
    const childrenNodes = currentChildren.map((child, i) => {
        const handleItemClick = () => {
            if (child.onClick) {
                child.onClick();
            }
            if (child.children && child.children.length) {
                setChildren(child.children);
            } else {
                handleToOrigin();
                onStateChange(false);
            }
            if (child.to) {
                if (matchPath(location.pathname, child.to)) {
                    navigate(child.to, {replace: true});
                } else {
                    navigate(child.to);
                }
            }
        };
        return (
            <SnackBarItem
                key={child.title}
                value={child.title}
                onClick={handleItemClick}
            />
        );
    });
    const handleMenuClose = useCallback(() => {
        handleToOrigin();
        onStateChange(false);
    }, []);
    return (
        <SnackBar
            isOpen={isOpen}
            onClose={handleMenuClose}
        >
            {childrenNodes}
        </SnackBar>
    )
}
