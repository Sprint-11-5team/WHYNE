'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';

type StarRatingProps = {
    rating?: number;
    isInteractive?: boolean;
    onRatingChange?: (rating: number) => void;
    size?: 'default' | 'small';
};

function StarRating({
    rating = 0,
    isInteractive = false,
    onRatingChange,
    size,
}: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [currentRating, setCurrentRating] = useState<number>(rating);

    const handleStarClick = (newRating: number) => {
        if (isInteractive) {
            setCurrentRating(newRating);
            if (onRatingChange) {
                onRatingChange(newRating);
            }
        }
    };

    const handleMouseEnter = (starIndex: number) => {
        if (isInteractive) {
            setHoverRating(starIndex);
        }
    };

    const handleMouseLeave = () => {
        if (isInteractive) {
            setHoverRating(null);
        }
    };

    const getStarFillPercentage = (starIndex: number, activeRating: number) => {
        if (starIndex <= activeRating) {
            return 100;
        }
        if (starIndex === Math.ceil(activeRating)) {
            return (activeRating % 1) * 100;
        }
        return 0;
    };

    const renderStars = () => {
        const stars = [];
        const effectiveRating = hoverRating || currentRating;

        for (let i = 1; i <= 5; i++) {
            const fillPercentage = getStarFillPercentage(i, effectiveRating);

            stars.push(
                <Button
                    key={i}
                    size='large'
                    color='white'
                    addClassName={`relative flex border-none hover:bg-white ${isInteractive ? 'cursor-pointer' : 'cursor-default'
                        } ${size !== 'small'
                            ? 'desktop:h-[3rem] desktop:w-[3.3rem] tablet:h-[3.5rem] tablet:w-[3.5rem]'
                            : 'desktop:h-[3rem] desktop:w-[3.3rem] tablet:h-[2.5rem] tablet:w-[2.5rem]'
                        }`}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleStarClick(i)}
                    type='button'
                >
                    <div className='relative flex h-full w-full'>
                        <Image
                            width={300}
                            height={300}
                            src='/icons/star.svg'
                            alt='비어있는 별'
                            className='object-contain !m-0 !p-0'
                            style={{ border: 'none' }}
                        />
                        <Image
                            width={300}
                            height={300}
                            src='/icons/star_fill.svg'
                            alt='채워진 별'
                            className='absolute left-0 top-0 object-contain !m-0 !p-0'
                            style={{
                                clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
                                border: 'none'
                            }}
                        />
                    </div>
                </Button>
            );
        }
        return stars;
    };

    return <div className='flex items-center gap-[0.8rem] tablet:gap-[0.8rem]'>{renderStars()}</div>;
}

export default StarRating;