'use client';

import { useReviewModalStore } from '@/provider/usereviewmodals';
import Slider from '@/components/common/Slider';

const sliderData = [
    { label: '바디감', descriptions: ['가벼워요', '진해요'] },
    { label: '타닌', descriptions: ['부드러워요', '떫어요'] },
    { label: '당도', descriptions: ['드라이해요', '달아요'] },
    { label: '산미', descriptions: ['안셔요', '많이셔요'] },
];

export default function TasteSlider() {
    const { tasteValues, setTasteValues } = useReviewModalStore();

    const handleSliderChange = (index: number, value: number) => {
        const newTasteValues = [...tasteValues];
        newTasteValues[index] = value;
        setTasteValues(newTasteValues);
    };

    return (
        <section className='whitespace-nowrap py-[1.2rem] px-[1.2rem]'>
            {sliderData.map((slider, index) => (
                <div
                    key={slider.label}
                    className='mb-[1rem] flex items-center'
                >
                    <p className='mr-[1.2rem] w-[4.5rem] h-[3rem] flex-shrink-0 rounded-[0.8rem] bg-gray-100 py-[0.5rem] 
                    text-center text-md font-medium text-gray-500 mobile:w-[5rem] mobile:text-center'>
                        {slider.label}
                    </p>
                    <p className='mr-[2rem] ml-[0.5rem] w-[3rem] flex-shrink-0 text-[1.4rem] font-regular'>
                        {slider.descriptions[0]}
                    </p>
                    <div className='flex-1 mx-[2rem]'>
                        <Slider
                            value={tasteValues[index]}
                            mode='interactive'
                            onChange={(value) => handleSliderChange(index, value)}
                            width='100%'
                            height='0.4rem'
                            trackStyle={{ backgroundColor: 'var(--color-primary)', height: '0.4rem' }}
                            railStyle={{ backgroundColor: '#cfdbea', height: '0.4rem' }}
                            handleStyle={{
                                borderColor: 'var(--color-primary)',
                                height: '1.6rem',
                                width: '2rem',
                                marginTop: '-0.6rem',
                                backgroundColor: 'var(--white)'
                            }}
                        />
                    </div>
                    <p className='mr-[1rem] w-[2.5rem] flex-shrink-0 text-md font-regular text-right'>
                        {slider.descriptions[1]}
                    </p>
                </div>
            ))}
        </section>
    );
}