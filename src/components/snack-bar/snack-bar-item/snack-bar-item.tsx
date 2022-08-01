import React, {FC} from 'react';
import styled from 'styled-components';

type Props = {
    value: string;
    description?: string;
    count?: number;
    onClick: () => void;
};

const Item = styled.div`    
    padding: 0 15px;
    display: flex;
    cursor: pointer;
    border-radius: 8px;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

    &:active,
    &:hover {
        background: #f3f1ed;
    }
`;

const ItemText = styled.div`
    font-size: 16px;
    line-height: 19px;
    margin: 15px 0 14px;
`;

const ItemDescription = styled.div`
    font-size: 12px;
    line-height: 15px;
    opacity: 0.6;
    margin-top: 3px;
`;

const ItemCount = styled.div`
    font-size: 16px;
    line-height: 22px;
    opacity: 0.4;
    margin: 15px 0 14px;
    position: absolute;
    right: 20px;
`;

const SnackBarItem: FC<Props> = React.memo((props) => {
    const {value, description, onClick, count} = props;
    return (
        <Item onClick={onClick}>
            <ItemText>
                {value}
                {description ? <ItemDescription>{description}</ItemDescription> : null}
            </ItemText>
            {count ? <ItemCount>{count}</ItemCount> : null}
        </Item>
    );
});

export {
    SnackBarItem,
};
