import Header from '../components/Header';
import styled from 'styled-components';
import BlankTop from '../components/BlankTop';
import Footer from '../components/Footer';
import Button from '../components/Button';
import {useHistory, Link} from 'react-router-dom';
import React, {useState} from 'react';
import {loginUser} from '../_actions/user_action';
import {useDispatch} from 'react-redux';
import { useEffect } from 'react';

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
    const dispatch = useDispatch();
    const history = useHistory();
    const [info, setInfo] = useState({
        username: '',
        password: ''
    });

    const clear = async () => {
        setInfo({ username:'', password:'' });
    }

    const formSubmit = async evt => {
        evt.preventDefault();
        console.log("login attempt")
        console.log(info)
        dispatch(loginUser(info))
            .then(response=> {
                console.log(response);
                if(response.payload){
                    window.localStorage.setItem('isAuth','true');
                    window.localStorage.setItem('id', info.username);
                    window.localStorage.setItem('accessToken', response.payload.key);
                    history.push('/');
                }
                else{
                    alert("????????? ??????");
                    clear();
                }
            })
    }

    const onInputChange = async e => {
        const{name, value} = e.target;
        setInfo({
            ...info,
            [name] : value
        })
    }

    useEffect(() => {}, [info]);

    return(
        <Fix>
            <Wrapper>
                <Header/>
                <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
                <LargeP>?????????</LargeP>
                <GrayCard>
                    <LargeP style={{color:"#3B8686", display:"inline-block"}}>?????????</LargeP>
                    <LargeP style={{display:"inline-block"}}>??? ?????? ?????????</LargeP>
                    <form>
                        <Input placeholder="   ?????????" name='username' value={info.username} onChange={onInputChange}/>
                        <Input style={{fontFamily:"Roboto"}}type="password" placeholder="   ????????????" name='password' value={info.password} onChange={onInputChange}/>
                        <Button width='210' font="20" background="#3B8686" color="#FAECEC" marginRight="20" type="submit" onClick={formSubmit}>?????????</Button>
                        <Button width='210' font="20" background="#042525" color="#FAECEC" marginRight="0" onClick={clear}>??????</Button>
                        <Button width='210' font="20" background="#DADBDB" color="#000000" marginTop="10" marginRight="0" onClick={() => history.push(`/signup`)}>????????????</Button>
                    </form>
                </GrayCard>
                <Footer/>
            </Wrapper>
        </Fix>
    );
}
export default Login;