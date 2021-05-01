import Header from '../components/Header';
import styled from 'styled-components';
import BlankTop from '../components/BlankTop';
import Footer from '../components/Footer';
import Button from '../components/Button';
import {useHistory, Link} from 'react-router-dom';
import {Form} from 'antd';
import React, {useState} from 'react';

const Fix =styled.div`
min-height:100vh;
background-color:  #ffffff;
`;

const Wrapper = styled.div`
  width:120rem;
  height: 100%;
  padding:30px;
  display: flex;
  flex-direction: column;
  margin: 10 auto;
`;

const LargeP = styled.div`
    font-size: 40px;
    color: "black";
    font-family: "NanumSquare";
    margin-left: auto;
    margin-right: auto;
`
const GrayCard = styled.div`
    width: 610px;
    background-color: #DADBDB;
    margin-top: 50px;
    margin-bottom:50px;
    margin-left: auto;
    margin-right: auto;
    font-family: "NanumSquare";
    padding: 2vw 2vw 1vw 2vw;
    text-align: center;
`

const Input = styled.input`
    width: 480px;
    height: 80px;
    backgroud-color: #EAEAEA;
    margin-top: 50px;
    font-family: "NanumSquare";
    font-size: 20px;
`

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <Fix>
            <Wrapper>
                <Header/>
                <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
                <LargeP>로그인</LargeP>
                <GrayCard>
                    <LargeP style={{color:"#3B8686", display:"inline-block"}}>아이디</LargeP>
                    <LargeP style={{display:"inline-block"}}>를 통한 로그인</LargeP>
                    <form>
                        <Input placeholder="   아이디" value={username} onChange={(e) => setUsername(e.value)}/>
                        <Input placeholder="   비밀번호" value={password} onChange={(e) => setPassword(e.value)}/>
                        <Button width='210' font="20" background="#3B8686" color="#FAECEC" marginRight="20" type="submit">로그인</Button>
                        <Button width='210' font="20" background="#042525" color="#FAECEC" marginRight="0" type="submit">취소</Button>
                        <Button width='210' font="20" background="#DADBDB" color="#000000" marginTop="10" marginRight="0" onClick={() => history.push(`/signup`)}>회원가입</Button>
                    </form>
                </GrayCard>
                <Footer/>
            </Wrapper>
        </Fix>
    );
}
export default Login;