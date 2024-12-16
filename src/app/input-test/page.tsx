import Input from '@/components/common/Input';

export default function Home() {
    return (
      <main className="p-24">
        <div className="space-y-4">
          {/* 기본 사용 */}
          <div>
            <h2>기본 입력필드:</h2>
            <Input placeholder="기본 입력필드" />
          </div>
  
          {/* 에러 상태 */}
          <div>
            <h2>에러 상태:</h2>
            <Input placeholder="에러 상태" isErrored={true} />
          </div>
  
          {/* 너비 제한 */}
          <div className="w-[20.4375rem] tablet:w-[25.75rem]">
            <h2>너비 제한된 입력필드:</h2>
            <Input placeholder="너비 제한" />
          </div>
        </div>
      </main>
    );
  }