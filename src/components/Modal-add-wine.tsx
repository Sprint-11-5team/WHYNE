'use client';

import { useState } from 'react';
import { NewWineData, WineType } from '@/types/tasting';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import WineTypeDropdown from './common/TypeDropdown';

interface Props {
    onClose: () => void;
}

export default function AddWine({ onClose }: Props) {
    const [values, setValues] = useState<NewWineData>({
        name: '',
        region: '',
        image: 'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Sprint_Mission/user/3/1721991786504/31563.png',
        price: 0,
        type: WineType.None
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = (id: string, value: string | number | WineType): string => {
        switch (id) {
            case 'name':
                return !value || (typeof value === 'string' && value.trim() === '') 
                    ? '와인 이름을 입력해주세요.'
                    : '';
            
            case 'price':
                if (!value || Number(value) === 0) return '가격을 입력해주세요.';
                return Number(value) < 0 || Number(value) > 1000000
                    ? '유효한 가격 범위는 0~1,000,000원입니다.'
                    : '';
            
            case 'region':
                return !value || (typeof value === 'string' && value.trim() === '')
                    ? '원산지를 입력해주세요.' : '';
        
            case 'type':
                return value === WineType.None ? '와인 타입을 선택해주세요.' : '';

            default:
                return '';
        }
    };

    const updateFieldValue = (id: string, value: string | number | WineType) => {
        const newValues = {
            ...values,
            [id]: value
        };
        setValues(newValues);
        
        // 필드가 터치되었음을 표시
        setTouched(prev => ({
            ...prev,
            [id]: true
        }));

        // 에러 검사
        const errorMessage = validateField(id, value);
        if (errorMessage) {
            setErrors(prev => ({ ...prev, [id]: errorMessage }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[id];
                return newErrors;
            });
        }
    };

    const handleWineValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        updateFieldValue(id, id === 'price' ? Number(value) : value);
    };

    const handleTypeChange = (value: WineType) => {
        updateFieldValue('type', value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('제출된 와인 데이터:', values);
        onClose();
    };

    const isSubmitDisabled = !values.name || !values.region || values.price === 0 || 
                            values.type === WineType.None || !values.image || 
                            Object.keys(errors).length > 0;

    return (
        <div className='w-[35rem] h-[60rem] rounded-[1.5rem] bg-white'>
          <article className='flex flex-col px-[2rem] py-[1.5rem]'>
            <h1 className='text-[1.9rem] font-bold mt-[1rem] mb-[5rem]'>와인 등록</h1>
      
            <form className='flex flex-col gap-[2.5rem]' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-[2.5rem]'>
                <div className='flex flex-col gap-[1.5rem]'>
                  <label htmlFor='name' className='text-[1.125rem] font-medium'>와인 이름</label>
                  <Input
                    id='name'
                    placeholder='와인 이름 입력'
                    onChange={handleWineValueChange}
                    className='w-full'
                    error={touched.name ? errors.name || '' : ''}
                  />
                </div>
      
                <div className='flex flex-col gap-[1rem]'>
                  <label htmlFor='price' className='text-[1.125rem] font-medium'>가격</label>
                  <Input
                    id='price'
                    placeholder='가격 입력'
                    type='number'
                    min='0'
                    onChange={handleWineValueChange}
                    error={touched.price ? errors.price || '' : ''}
                  />
                </div>
      
                <div className='flex flex-col gap-[1rem]'>
                  <label htmlFor='region' className='text-[1.125rem] font-medium'>원산지</label>
                  <Input
                    id='region'
                    placeholder='원산지 입력'
                    onChange={handleWineValueChange}
                    error={touched.region ? errors.region || '' : ''}
                  />
                </div>
      
                <div className='flex flex-col gap-[1rem]'>
                    <label htmlFor='type' className='text-[1.125rem] font-medium'>타입</label>
                    <WineTypeDropdown
                        value={values.type}
                        onChange={handleTypeChange}
                        onBlur={() => {
                            setTouched(prev => ({
                                ...prev,
                                type: true
                            }));
                        }}
                        error={touched.type ? errors.type : undefined}
                    />
                </div>                
      
                <div className='flex flex-col gap-[1rem]'>
                  <label htmlFor='image' className='text-[1.125rem] font-medium'>이미지</label>
                  <Input id='image' placeholder='이미지 선택' />
                </div>
              </div>
      
              <div className='flex gap-[1rem] mt-[1rem]'>
                <Button
                  size='small'
                  color='white'
                  type='button'
                  onClick={onClose}
                  addClassName='flex-1 text-primary font-bold'
                >
                  취소
                </Button>
                <Button
                  size='small'
                  color='primary'
                  type='submit'
                  disabled={isSubmitDisabled}
                  addClassName='flex-[2.4] font-bold'
                >
                  와인 등록하기
                </Button>
              </div>
            </form>
          </article>
        </div>
    );
}