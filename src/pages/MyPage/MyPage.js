import Header from '../../components/Header';
import styled from 'styled-components';
import BlankTop from '../../components/BlankTop';
import Footer from '../../components/Footer';
import Explanation from '../../components/Explanation';
import Button from '../../components/Button';
import {useHistory, Link} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Divider } from 'antd';
import React, {useState, useCallback} from 'react';
import { createPortal } from 'react-dom';

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
    const history = useHistory();
    const [list, setList] = useState({
        user: 'yun',
        account: '농협 3520421907713',
        group: [
            {
                id: '1',
                name: '사회인 농구 동호회: 뭉쳐야 쏜다!'
            },
            {
                id:'2',
                name: "직장인 밴드 '청춘은 바로 지금'"
            }
        ]
    });

    return(
        <Fix>
            <Wrapper>
            <Header/>
            <Box>
            <Explanation size="35" margin_top="30" margin_left="60" contents={String(`${list.user} 님`)}/>
            <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
            <Explanation size="27" margin_top="10" margin_left="60" color="#8D8D8D" contents={String(`환급계좌 : ${list.account}`)}/>
            <Explanation size="27" margin_top="10" margin_left="60" color="#8D8D8D" contents={String(`가입 단체 수 : ${list.group.length}개`)}/>
            <Button style={{marginLeft:"auto", marginTop:"-30px", paddingBottom:"10px"}}font="23" color="#8D8D8D" onClick={()=>{console.log("수정")}}>수정</Button>
            </Box>
            <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
            <TransparentBox>
            <Explanation style={{display:"inline-block"}} size="35" margin_top="10" margin_left="10" color="#000000" contents="단체 목록"/>
            <Explanation style={{display:"inline-block"}} size="25" margin_top="10" margin_left="1220" color="#000000" contents="새로운 단체 만들기"/>
            <Button height='40' width="40" font="23" background="#55967E" color="#FFFFFF" marginTop="5" marginRight="20"onClick={()=>{console.log("추가")}}>+</Button>
            </TransparentBox>
            <Box>
                {list.group.map((account, i) => {
                    return(
                        <div>
                        {i==Number(list.group.length)-1 ? 
                            <List><Title href="/">{account.name}</Title></List>
                            :
                            <List style={{borderBottom: "solid 1px"}}><Title href="/">{account.name}</Title></List>
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