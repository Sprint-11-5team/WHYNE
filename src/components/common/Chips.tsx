'use client';

import React from 'react';
import { MouseEventHandler } from 'react';
import Button from '@/components/common/Button';

type ChipProps = {
    /**
     * 칩에 표시될 텍스트 라벨.
     */
    label: string;

    /**
     * 칩이 선택된 상태인지 여부를 나타냄.
     * - `true`: 칩이 선택된 상태. 보라색 배경
     * - `false`: 칩이 선택되지 않은 상태. 흰색 배경
     */
    selected?: boolean;

    /**
     * 칩이 클릭되었을 때 호출되는 함수.
     * 클릭 이벤트 핸들러로, 칩이 비활성화되지 않은 경우에만 호출.
     */
    onClick?: MouseEventHandler;

    /**
     * 칩이 비활성화된 상태인지 여부를 나타냅니다.
     * - `true`: 칩이 비활성화되어 클릭할 수 없음
     * - `false`: 칩이 활성화되어 있으며 클릭 가능
     */
    isDisabled: boolean;
};

/**
 * `Chip` 사용자 인터페이스에서 라벨을 가진 선택 가능한 요소
 * - `label`: 칩 내부에 표시될 텍스트.
 * - `selected` 상태에 따라 칩의 스타일이 변경
 * - `onClick` 핸들러를 통해 칩이 클릭되었을 때 동작을 정의할 수 있음
 * - `isDisabled`가 `true`일 경우, 칩은 클릭할 수 없고 비활성화된 상태로 표시
 */
function Chip({
    label,
    selected,
    onClick,
    isDisabled,
}: ChipProps): React.ReactElement {
    const baseClasses = 'rounded-[6.25rem] px-[1.5rem] py-[0.75rem] text-sm font-medium border border-solid';
    const selectedClasses = selected
        ? 'bg-primary border-primary text-white'
        : 'bg-white text-gray-800 !border-gray-300';  // !border로 우선순위를 높여줍니다
    const cursorClasses = isDisabled
        ? 'cursor-default' : 'cursor-pointer';
    const className = `${baseClasses} ${selectedClasses} ${cursorClasses}`;

    return (
        <Button
            size='large'
            color={selected ? 'primary' : 'white'}
            className={className}
            onClick={!isDisabled ? onClick : undefined}
            type='button'
            disabled={isDisabled}
        >
            {label}
        </Button>
    );
}

export default Chip;
