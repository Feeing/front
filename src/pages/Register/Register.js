import Header from '../../components/Header';
import styled from 'styled-components';
import BlankTop from '../../components/BlankTop';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import React, {useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef, useRef } from "react";
import Dropdown from 'react-dropdown';
import './register.css';
import {registerGroup} from '../../_actions/user_action';
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
`;

const GrayCard = styled.div`
    width: 610px;
    background-color: #DADBDB;
    margin-top: 50px;
    margin-bottom:50px;
    margin-left: auto;
    margin-right: auto;
    font-family: "NanumSquare";
    padding: 30px 30px 30px 30px;
    text-align: center;
`;

const NameTag = styled.div`
    width: 100px;
    font-size: 20px;
    color: "black";
    font-family: "NanumSquare";
    margin-left: 20px;
    margin-top : 10px;
    background-color: #EAEAEA;
    display: inline-block;
`
const TimeTag = styled.div`
    font-size: 20px;
    color: "black";
    font-family: "NanumSquare";
    margin-left: 10px;
    margin-right: 20px;
    background-color: #EAEAEA;
    display: inline-block;
`

const Input = styled.input`
    width: 300px;
    height: 30px;
    border: 0px;
    font-family: "NanumSquare";
    font-size: 20px;
    display: inline-block;
`;

const InputDiv = styled.div`
    width: 485px;
    height: 50px;
    margin-top: 30px;
    margin-left: 60px;
    font-family: "NanumSquare";
    font-size: 20px;
    background-color: #EAEAEA;
    text-align: left;
`;


const Register = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    let today = new Date();
    const [account, setAccount] = useState({
        group_name: '',
        //founder: window.localStorage.getItem('id'),
        account_number: '',
        renew_time: '',
        start_date: '',
        account_owner: ''
    });
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    
    const onAccountChange = async evt =>{
        const {name, value} = evt.target
        try{
            setAccount({
                ...account,
                [name]: value
            });
        }
        catch (e) {
            console.error(e);
        }
    }
    const onAccountChangeForDate = async evt =>{
        console.log(evt);
        let temp = evt.toString();
        let tmp = temp.substring(11,15);
        tmp = tmp+"-";
        const arr = [{mon:"Jan", value:"01"}, {mon:"Feb", value:"02"}, {mon:"Mar", value:"03"}, 
        {mon:"Apr", value:"04"}, {mon:"May", value:"05"}, {mon:"Jun", value:"06"}, {mon:"Jul", value:"07"},
        {mon:"Aug", value:"08"}, {mon:"Sep", value:"09"}, {mon:"Oct",value:"10"}, {mon:"Nov",value:"11"}, {mon:"Dec",value:"12"}];
        arr.map((month) => {
            const val = month.value;
            if(month.mon == temp.substring(4,7)) tmp = tmp+val;
        })
        tmp = tmp+"-";
        tmp = tmp+temp.substring(8,10);
        console.log(tmp);
        setAccount({
            ...account,
            start_date: tmp
        });
    }

    let varhour='';
    let varmin='';

    const handleHourMenuClick = async e => {
        varhour=e.value;
        setHour(e.value);
        setTime();
    }
    const handleMinuteMenuClick = e => {
        varmin=e.value;
        setMinute(e.value);
        setTime();
    }
    const hourlist = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    const minutelist = [10,20,30,40,50];
    
    useEffect(() => {
        setTime();
    }, [hour, minute]);

    const ExampleCustomInput = forwardRef(
        ({ value, onClick }, ref) => (
          <button className="example-custom-input" style={{paddingLeft:"1rem", paddingTop:"1rem", fontSize:"18px", color: "#000000", background:"#EAEAEA", height:"30px", width:"200px", border:"0px"}} onClick={onClick} ref={ref}>
           {value||"날짜를 선택하세요"}
          </button>
        ),
      );

    const setTime = async (e) => {
        const tmp =String(hour)+":"+String(minute)+":"+"00";
        console.log(tmp);
        console.log(hour);
        console.log(minute);
        setAccount({...account, renew_time:tmp});
    }

      const formSubmit = async evt => {
        console.log("register attempt");
        console.log(account);
        dispatch(registerGroup(account))
            .then(response=> {
                console.log(response);
                if(response.payload.group_id){
                    history.push('/mypage');
                }
                else{
                    alert("계정이 등록되지 않았습니다. 입력값을 다시 확인해주세요");
                }
            })
    }

    return(
        <Fix>
            <Wrapper>
                <Header/>
                <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
                <LargeP>단체 등록</LargeP>
                <GrayCard>
                    <div>
                        <InputDiv>
                         <NameTag>단체명</NameTag> 
                         <Input type="text" style={{backgroundColor: "#EAEAEA"}} name="group_name"onChange={onAccountChange}/>
                        </InputDiv>
                        <InputDiv>
                        <NameTag>계좌주</NameTag>
                        <Input  type="text" style={{backgroundColor: "#EAEAEA"}} name="account_owner" onChange={onAccountChange}/>
                        </InputDiv>
                        <InputDiv>
                        <NameTag>계좌번호</NameTag>
                        <Input type="text" style={{backgroundColor: "#EAEAEA"}} name="account_number" onChange={onAccountChange}/>
                        </InputDiv>
                        <InputDiv>
                         <NameTag>갱신시점</NameTag>
                            <Dropdown options={hourlist} onChange={handleHourMenuClick} placeholder="Hour"></Dropdown>
                            <TimeTag>시</TimeTag>
                            <Dropdown options={minutelist} onChange={handleMinuteMenuClick} placeholder="Minute"></Dropdown>
                            <TimeTag>분</TimeTag>
                        </InputDiv>
                      <InputDiv>
                         <NameTag>조회시작일</NameTag>
                            <DatePicker customInput={<ExampleCustomInput/>} value={account.start_date} placeholderText="조회시작일"  onChange={onAccountChangeForDate}/>
                         </InputDiv>
                        <Button width='210' font="20" background="#3B8686" color="#FAECEC" marginTop="30" marginRight="20" type="submit" onClick={formSubmit}>확인</Button>
                    </div>
                </GrayCard>
                <Footer/>
            </Wrapper>
        </Fix>
    );
}
export default Register;