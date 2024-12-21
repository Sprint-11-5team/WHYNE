'use client';

import React from 'react';

/**
 * ### 슬라이더 컴포넌트
 *
 * - value - 슬라이더의 **현재 값** (0에서 100 사이의 숫자)
 * - mode - 슬라이더 모드 (기본값: 'interactive') ('interactive'는 유저가 값을 조정 가능, 'readonly'는 조정 불가)
 * - onChange - 슬라이더 값이 변경될 때 호출되는 **함수**
 * - width - 슬라이더의 너비 (기본값: '200px')
 *
 * 아래와 같이 사용합니다.
 * - const [sliderValue, setSliderValue] = useState<number>(50);
 * - const handleSliderChange = (value: number) => {
 * - setSliderValue(value); };
 */
export default function Slider({
    value = 5,
    mode = 'interactive',
    onChange,
    width = '200px',
}: {
    value: number;
    mode: 'interactive' | 'readonly';
    onChange?: (sliderValue: number) => void;
    width?: string;
    height?: string;
    trackStyle?: React.CSSProperties;
    railStyle?: React.CSSProperties;
    handleStyle?: React.CSSProperties;
}): React.ReactElement {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(Number(event.target.value));
    };


    return (
        <div style={{ width }} className="relative">
            <input
                type="range"
                min={0}
                max={10}
                value={value}
                onChange={handleChange}
                disabled={mode === 'readonly'}
                className="w-full h-[6px] bg-gray-200 rounded-full appearance-none cursor-pointer focus:outline-none
      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:h-[16px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
      [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-none
      [&::-webkit-slider-runnable-track]:bg-gray-100 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:border [&::-webkit-slider-runnable-track]:border-gray-300
      focus:[&::-webkit-slider-thumb]:outline-none focus:[&::-webkit-slider-thumb]:ring-2 focus:[&::-webkit-slider-thumb]:ring-purple-300
      disabled:opacity-50 disabled:cursor-not-allowed"
            />
        </div>
    );
}