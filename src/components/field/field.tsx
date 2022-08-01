import React, {useMemo} from 'react';
import {Grid, Tips} from '../../model/logic';
import styled, {css} from 'styled-components';
import {TipsGrid} from '../../components/tips-grid';

const FieldContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 96vmin;
    height: 96vmin;
    max-width: 500px;
    max-height: 500px;
    overflow: hidden;
    border: 2px solid gray;
`;

const FieldRow = styled.div`
    display: flex;
    flex: 1 0 0;
`;

const FieldCell = styled.div<{isSelected: boolean, isSource: boolean}>`
    display: flex;
    overflow: hidden;
    color: ${({isSource}) => isSource ? '#000000' : '#3d57a2'};
    position: relative;
    flex: 1 1 0;
    justify-content: center;
    align-items: center;
    
    ${({isSelected}) => isSelected && css`background-color: #e0e7fb;`}
`;

const FieldLine = styled.div<{isBold: boolean}>`
    width: 100%;
    height: ${({isBold}) => isBold ? '2px' : '1px'};
    background: ${({isBold}) => isBold ? 'gray' : 'lightgray'};
    flex: 0 1 auto;
`;

const FieldColumn = styled.div<{isBold: boolean}>`
    width: ${({isBold}) => isBold ? 2 : 1}px;
    background: ${({isBold}) => isBold ? 'gray' : 'lightgray'};
    flex: 0 1 auto;
`;

const FieldDigit = styled.span`
    font-size: 20px;
    text-align: center;
    vertical-align: middle;
    font-family: Arial, sans-serif;
`;

type Props = {
    grid: Grid,
    sourceGreed: Grid,
    tips: Tips,
    selectedCell?: {i: number, j: number},
    onCellSelect: (i: number, j: number) => void,
};

export function Field({grid, tips, selectedCell, onCellSelect, sourceGreed}: Props) {
    const lines = grid.map((line, i) => useMemo(() => (
        <FieldRow>
            {line.map((cell, j) => (
                <React.Fragment key={j}>
                    <FieldCell
                        isSource={Boolean(sourceGreed[i][j])}
                        isSelected={Boolean(selectedCell && selectedCell.i === i && selectedCell.j === j)}
                        onClick={() => onCellSelect(i, j)}
                    >
                        {
                            cell
                                ? (<FieldDigit>{cell}</FieldDigit>)
                                : tips[i][j]
                                ? (<TipsGrid tips={tips[i][j]} />)
                                : null
                        }
                    </FieldCell>
                    {(j < line.length - 1) ? <FieldColumn isBold={(j + 1) % Math.sqrt(grid.length) == 0} /> : null}
                </React.Fragment>
            ))}
        </FieldRow>
    ), [line, tips[i], !!selectedCell && selectedCell.i === i && selectedCell.j]));
    return (
        <FieldContainer>
            {grid.map((line, i) => (
                <React.Fragment key={i}>
                    {lines[i]}
                    {(i < grid.length - 1) ? <FieldLine isBold={(i + 1) % Math.sqrt(grid.length) == 0} /> : null }
                </React.Fragment>
            ))}
        </FieldContainer>
    );
}
