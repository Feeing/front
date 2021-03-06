import Header from '../components/Header';
import styled from 'styled-components';
import BlankTop from '../components/BlankTop';
import Footer from '../components/Footer';
import Button from '../components/Button';
import React, {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {userSignUp} from '../_actions/user_action';
import {useDispatch} from 'react-redux';

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
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: '',
        username: '',
        password1: '',
        password2: '',
        phone: '',
        bank_account: ''
    });

    const onInputChange = async e => {
        const{name, value} = e.target;
        setUser({
            ...user,
            [name] : value
        })
    }

    const formSubmit = async evt => {
        evt.preventDefault();
        console.log("signup attempt");
        dispatch(userSignUp(user))
            .then(response=> {
                if(response.payload.key){
                    history.push('/login')
                }
                if(response.payload.data){
                    let errmsg='';
                    console.log(response.payload.data)
                    if(response.payload.data.username){
                        if(response.payload.data.username[0]==="This field may not be blank."){
                            {errmsg = errmsg + "????????? ?????? ???????????????"};
                        }
                        else{
                            {errmsg = errmsg + "?????? ???????????? ??????????????????."}
                        }
                        console.log(errmsg);
                    }
                    else if(response.payload.data.password1){
                        if(response.payload.data.password1[0]==="This password is too short. It must contain at least 8 characters."){
                            {errmsg = errmsg + "??????????????? 8??? ????????????????????????."};
                        }
                        else{
                            {errmsg = errmsg + "??????????????? ?????? ????????????."};
                        }
                    }
                    else if(response.payload.data.non_field_errors){
                        if(response.payload.data.non_field_errors[0]==="The two password fields didn't match."){
                            {errmsg = errmsg + "??????????????? ???????????? ????????? ????????????."};
                        }
                    }
                    else{
                        {errmsg = errmsg + "???????????? ?????? ??????????????????."};
                    }
                    alert(errmsg);
                }
            })
    }

    return(
        <Fix>
            <Wrapper>
                <Header/>
                <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
                <LargeP>????????????</LargeP>
                <GrayCard>
                    <form onSubmit={formSubmit}>
                        <Input placeholder="   ??????" name="name"  onChange={onInputChange}/>
                        <Input placeholder="   ?????????" name="username" onChange={onInputChange}/>
                        <Input style={{fontFamily:"Roboto"}}type="password" placeholder="   ????????????" name="password1" onChange={onInputChange}/>
                        <Input style={{fontFamily:"Roboto"}}type="password" placeholder="   ???????????? ??????" name="password2" onChange={onInputChange}/>
                        <Input placeholder="   ????????? ??????" name="phone" onChange={onInputChange}/>
                        <Input placeholder="   ?????? ????????????" name="bank_account" onChange={onInputChange}/>
                        <Button width='210' font="20" background="#3B8686" color="#FAECEC" marginTop="30" marginRight="20" type="submit">??????</Button>
                    </form>
                </GrayCard>
                <Footer/>
            </Wrapper>
        </Fix>
    );
}
export default SignUp;