import React, { useCallback, useState, VFC } from 'react';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from './styles';
import { Link, Redirect } from 'react-router-dom';
import useInput from '@hooks/useinput';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
const SignUp = () => {
  // revalidate는 사용자가 의도적으로 swr를 사용할 수 있게 해준다.
  const { data, error, revalidate } = useSWR('/api/users', fetcher);
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  // 왜 password와 passwordCheck는 useInput의 두번째 파라미터는 사용하지 
  // 않았나? 그 이유는 비밀번호 체크에서 mismatchError를 더 사용해야했기
  // 때문이다.
  const [password, , setPassword] = useInput('');
  const [passwordCheck, , setPasswordCheck] = useInput('');
  const [missmatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  // const onChangeEmail = useCallback((e) => {
  //     setEmail(e.target.value)
  // }, [])

  // const onChangeNickname = useCallback((e) => {
  //     setNickname(e.target.value)
  // }, [])

  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value !== passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value !== password);
    },
    [password],
  );

  const onSubmit = useCallback(
    (e) => {
      // submit하고 새로고침 되는 것을 막기위해서
      e.preventDefault();
      console.log(email, nickname, password, passwordCheck);
      if (!missmatchError) {
        console.log('서버로 회원가입하기');
        // 항상 비동기 통신전에 state를 초기화하는 습관 들이기
        setSignUpError('');
        setSignUpSuccess(false);
        axios
          .post('/api/users', {
            email,
            nickname,
            password,
          })
          // 성공시 then
          .then((response) => {
            // response에 요청에 대한 응답이 담겨있다.
            console.log(response);
            setSignUpSuccess(true);
          })
          // 실패시 catch
          .catch((error) => {
            console.log(error.response);
            setSignUpError(error.response.data);
          })
          // 성공하든가 말든가 무조건
          .finally(() => { });
      }
    },
    // deps 에 내부에서 쓰인 state를 모두 포함 시켜야한다.
    // useCallback은 deps의 state가 바뀌면 내부 함수를 새로만들고 바뀌지 않는다면
    // 이전 함수를 계속 사용한다.
    [email, nickname, password, passwordCheck, missmatchError],
  );

  if (data) {
    return <Redirect to="/workspace/sleact/channel/일반" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {missmatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
