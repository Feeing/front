import Header from '../components/Header';
import styled from 'styled-components';
import BlankTop from '../components/BlankTop';
import Footer from '../components/Footer';
import Button from '../components/Button';
import React, {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';

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
`;

const GrayCard = styled.div`
    width: 610px;
    background-color: #DADBDB;
    margin-top: 50px;
    margin-bottom:50px;
    margin-left: auto;
    margin-right: auto;
    font-family: "NanumSquare";
    padding: 2vw 2vw 2vw 2vw;
    text-align: center;
`
const Input = styled.input`
    width: 480px;
    height: 50px;
    backgroud-color: #EAEAEA;
    margin-top: 30px;
    font-family: "NanumSquare";
    font-size: 20px;
`

const SignUp = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name: '',
        username: '',
        password1: '',
        password2: '',
        phone: '',
        bank_account: ''
    });

    return(
        <Fix>
            <Wrapper>
                <Header/>
                <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
                <LargeP>회원가입</LargeP>
                <GrayCard>
                    <form>
                        <Input placeholder="   이름" value={user.name} onChange={(e) => setUser({...user, name:e.value})}/>
                        <Input placeholder="   아이디" value={user.username} onChange={(e) => setUser({...user, username:e.value})}/>
                        <Input placeholder="   비밀번호" value={user.password} onChange={(e) => setUser({...user, password1:e.value})}/>
                        <Input placeholder="   비밀번호 확인" value={user.password} onChange={(e) => setUser({...user, password2:e.value})}/>
                        <Input placeholder="   핸드폰 번호" value={user.phone} onChange={(e) => setUser({...user, phone:e.value})}/>
                        <Input placeholder="   환급 계좌번호" value={user.bank_account} onChange={(e) => setUser({...user, bank_account:e.value})}/>
                        <Button width='210' font="20" background="#3B8686" color="#FAECEC" marginTop="30" marginRight="20" type="submit">확인</Button>
                    </form>
                </GrayCard>
                <Footer/>
            </Wrapper>
        </Fix>
    );
}
export default SignUp;