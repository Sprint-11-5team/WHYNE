import InputItem from "./input-item";

export default function SignUpForm() {
  return (
    <form>
      <InputItem
        label="이메일"
        id="email"
        type="email"
        placeholder="whyne@email.com"
      />
      <InputItem label="닉네임" id="nickname" type="text" placeholder="whyne" />
      <InputItem
        label="비밀번호"
        id="pw"
        type="password"
        placeholder="영문, 숫자 포함 8자 이상"
      />
      <InputItem
        label="비밀번호 확인"
        id="pw-check"
        type="password"
        placeholder="비밀번호 확인"
      />
    </form>
  );
}
