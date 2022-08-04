import React, {memo} from 'react';
import styled from "styled-components";
import {range} from '../../model/iterables';

const TipsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const TipsRow = styled.div`
    display: flex;
    flex: 1 0 0;
`;

const TipsCell = styled.div`
    display: flex;
    overflow: hidden;
    position: relative;
    flex: 1 1 0;
    justify-content: center;
    align-items: center;
`;

const TipsDigit = styled.span`
    font-size: 10px;
    font-family: Arial, sans-serif;
`;

const TipsGrid = ({tips}: {tips: number[]}) => {
    const gridSize = Math.ceil(Math.sqrt(tips.length));
    const indexes = [...range(gridSize - 1)];
    return (
        <TipsContainer>
            {indexes.map(i => (
                <TipsRow key={i}>
                    {indexes.map(j => (
                        <TipsCell key={j}>
                            <TipsDigit>{tips[i * gridSize + j] || null}</TipsDigit>
                        </TipsCell>
                    ))}
                </TipsRow>
            ))}
        </TipsContainer>
    );
};

const TipsGidMemo = memo(memo(TipsGrid));

export {TipsGidMemo as TipsGrid};
