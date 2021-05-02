import Header from '../../components/Header';
import styled from 'styled-components';
import BlankTop from '../../components/BlankTop';
import Footer from '../../components/Footer';
import Explanation from '../../components/Explanation';
import Button from '../../components/Button';
import {useHistory, Link} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Divider } from 'antd';
import React, {useState, useCallback, useEffect} from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from "react-redux";
import {getInfo} from '../../_actions/user_action';

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

const Box = styled.div`
    width:90%;
    margin-top:20px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px auto 10px 15px;
    display: flex;
    flex-direction: column;
    border-radius: 30px;
    box-shadow: 1px 1px 5px 5px #EAEAEA;
`;

const TransparentBox = styled.div`
    width:90%;
    margin-top:20px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px auto 10px 15px;
    display: flex;
    flex-direction: row;
`; 

const List = styled.div`
    width:auto;
    height:60px;
    padding-top:25px;
    padding-left:35px;
    display: flex;
    flex-direction: row;
    font-size: 30px;
    font-family: "NanumSquare";
`;

const Title = styled.a`
    color: #000000;
    text-decoration: none;
`

const MyPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [list, setList] = useState([]);
    const [name, setName] = useState('');
    const [account, setAccount] = useState('');

    useEffect (() => {
        dispatch(getInfo(window.localStorage.getItem("id")))
        .then (response => {
             console.log(response.payload)
            if(response.payload.username){
                setName(response.payload.name);
                setAccount(response.payload.bank_account);
                setList(response.payload.in_groups);
            }
            else{
                console.log("error")
            }
        })
    },[]);

    return(
        <Fix>
            <Wrapper>
            <Header/>
            <Box>
            <Explanation size="40" margin_top="30" margin_left="70" contents={String(`${name} 님`)}/>
            <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
            <Explanation size="27" margin_top="10" margin_left="60" color="#8D8D8D" contents={String(`환급계좌 : ${account}`)}/>
            <Explanation size="27" margin_top="10" margin_left="60" color="#8D8D8D" contents={String(`가입 단체 수 : ${list.length}개`)}/>
            <Button style={{marginLeft:"auto", marginTop:"-30px", paddingBottom:"10px"}}font="23" color="#8D8D8D" onClick={()=>{console.log("수정")}}>수정</Button>
            </Box>
            <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
            <TransparentBox>
            <Explanation style={{display:"inline-block"}} size="35" margin_top="10" margin_left="10" color="#000000" contents="단체 목록"/>
            <Explanation style={{display:"inline-block"}} size="25" margin_top="10" margin_left="1200" color="#000000" contents="새로운 단체 만들기"/>
            <Button height='40' width="50" font="23" background="#55967E" color="#FFFFFF" marginTop="5" marginRight="10"onClick={() => history.push(`/register`)}>+</Button>
            </TransparentBox>
            <Box>
                {list.map((account, i) => {
                    return(
                        <div>
                        {i==Number(list.length)-1 ? 
                            <List><Title onClick={() => history.push(`/list/${account.group_name}/${account.group_id}`)}>{account.group_name}</Title></List>
                            :
                            <List style={{borderBottom: "solid 1px"}}><Title onClick={() => history.push(`/list/${account.group_name}/${account.group_id}`)}>{account.group_name}</Title></List>
                        }
                        </div>
                    );
                })}
            </Box>
            <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
            <Footer/>
            </Wrapper>
        </Fix>
    );
}

export default MyPage;