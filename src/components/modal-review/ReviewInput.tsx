'use client';

import StarRating from '@/components/common/StarRating';
import TextArea from '@/components/common/TextArea';
import { useReviewModalStore } from '@/provider/usereviewmodals';
import Image from 'next/image';
import wine from '../../../public/icons/wine.svg';

export default function ReviewInput() {
    const { setContent, setRating, wineName } = useReviewModalStore();

    return (
        <>
            <section className="flex-start flex gap-[1rem] desktop:mb-[3rem] tablet:mb-[3rem] mobile:mb-[2rem] mt-[1rem] px-[1.2rem]">
                <div className="relative bg-gray-100 h-auto w-[6.7rem] rounded-[1rem] p-[1rem]">
                    <Image
                        width={200}
                        height={200}
                        alt="기본 와인 이미지"
                        src={wine}
                        className="object-contain"
                    />
                </div>
                <div className="flex flex-col gap-[1rem]">
                    <p className="mt-[1rem] break-words whitespace-nowrap text-lg font-semiBold mobile:w-[15rem] mobile:text-md mobile:leading-[2rem]">
                        {wineName}
                    </p>

                    <StarRating
                        isInteractive
                        onRatingChange={(newRating) => setRating(newRating)}
                    />
                </div>
            </section>
            <TextArea
                id="content"
                name="content"
                placeholder="후기를 작성해주세요"
                style={{
                    marginBottom: '3.2rem',
                    width: '100%',
                    height: '20rem',
                }}
                onChange={(e) => setContent(e.target.value)}
            />
        </>
    );
}