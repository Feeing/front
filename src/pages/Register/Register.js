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
    let today = new Date();
    const [account, setAccount] = useState({
        group_name: '',
        founder: '',
        account_number: '',
        renew_time: '',
        start_date: today,
        id: window.localStorage.getItem('id')
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

    const handleHourMenuClick = async e => {
        setHour(e.value);
        console.log(hour);
    }

    const handleMinuteMenuClick = e => {
        setMinute(e.value);
        console.log(minute);
    }
    const hourlist = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    const minutelist = [10,20,30,40,50];
        

    const ExampleCustomInput = forwardRef(
        ({ value, onClick }, ref) => (
          <button className="example-custom-input" style={{paddingLeft:"1rem", fontSize:"20px", color: "#000000", background:"#EAEAEA", height:"30px", width:"100px", border:"0px"}}onClick={onClick} ref={ref}>
           {value}
          </button>
        ),
      );

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
                         <Input type="text" style={{backgroundColor: "#EAEAEA"}} name="group_name" value={account.group_name} onChange={onAccountChange}/>
                        </InputDiv>
                        <InputDiv>
                        <NameTag>계좌주</NameTag>
                        <Input  type="text" style={{backgroundColor: "#EAEAEA"}} name="founder" value={account.founder} onChange={onAccountChange}/>
                        </InputDiv>
                        <InputDiv>
                        <NameTag>계좌번호</NameTag>
                        <Input type="text" style={{backgroundColor: "#EAEAEA"}} name="account_number" value={account.account_number} onChange={onAccountChange}/>
                        </InputDiv>
                        <InputDiv>
                         <NameTag>갱신시점</NameTag>
                            <Dropdown options={hourlist} value={hourlist[0]} onChange={handleHourMenuClick} placeholder="Hour"></Dropdown>
                            <TimeTag>시</TimeTag>
                            <Dropdown options={minutelist} value={hourlist[0]} onChange={handleMinuteMenuClick} placeholder="Minute"></Dropdown>
                            <TimeTag>분</TimeTag>
                        </InputDiv>
                      <InputDiv>
                         <NameTag>조회시작일</NameTag>
                            <DatePicker customInput={<ExampleCustomInput />} selected={account.start_date} placeholderText="조회시작일" onChange={date => setAccount({...account, start_date:date})}/>
                         </InputDiv>
                        <Button width='210' font="20" background="#3B8686" color="#FAECEC" marginTop="30" marginRight="20" type="submit" onClick={()=>{console.log(hour); console.log(minute); console.log(account)}}>확인</Button>
                    </div>
                </GrayCard>
                <Footer/>
            </Wrapper>
        </Fix>
    );
}
export default Register;