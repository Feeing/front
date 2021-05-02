import Header from '../../components/Header';
import styled from 'styled-components';
import BlankTop from '../../components/BlankTop';
import Footer from '../../components/Footer';
import Explanation from '../../components/Explanation';
import Button from '../../components/Button';
import {useHistory, Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import ButtonGroup from '../../components/ButtonGroup';
import {getHistory} from '../../_actions/user_action';
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

const ContentWrapper = styled.div`
    width:100%;
    height: 100%;
    padding:30px;
    display: flex;
    flex-direction: row;
    margin: 10 auto;
    text-align: center;
`;
const ListWrapper = styled.div`
    width: 1500px;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    margin: 10px auto auto 20px;
`

const Box = styled.div`
    width: 1500px;
    margin-top:20px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px auto 10px 15px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 1px 1px 5px 5px #EAEAEA;
`;

const ExplaDiv = styled.div`
  font-size: 25px;
  color: "black";
  font-family: "NanumSquare";
  height: auto;
  margin: auto auto auto auto;
  display: inline-block;
`;

const List = ({match}) => {
    const {group_name, group_id} = match.params
    const history = useHistory();
    const dispatch = useDispatch();
    const [list, setList] = useState([]);

    useEffect (() => {
        dispatch(getHistory(group_id))
        .then (response => {
            if(response.payload){
                setList(response.payload);
                console.log(response.payload)
            }
            else{
                console.log("error")
            }
        })
    },[]);
    let total = 0;
    let balance = 0;
    {list.map((his, i) => {
        if(i==0) balance = his.balance;
        if(his.money < 0){
            total += his.money;
        }
    })}
    return(
        <Fix>
            <Wrapper>
            <Header/>
            <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
            <ContentWrapper>
            <ButtonGroup btnlist="#2BA700" btnnotice="#BBBBBB" btnqna="#BBBBBB" txtlist="#FFFFFF" txtnotice="#FFFFFF" txtqna="#FFFFFF" group_name={group_name} group_id={group_id}/>
            <ListWrapper>
                <div style={{display:"flex", flexDirection:"row"}}>
                <Explanation size="40" margin_top="20" margin_left="-580" contents={String(`<${group_name}> 거래내역`)}/>
                <Box style={{marginTop:"0px", width:"700px", flexDirection:"row", textAlign:"center"}}>
                    <ExplaDiv>현재 잔액 &nbsp;&nbsp; {String(balance).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원&nbsp;&nbsp;&nbsp;&nbsp;</ExplaDiv>
                    <ExplaDiv>누적 지출액 &nbsp;&nbsp; {String(`${total}`).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</ExplaDiv>
                </Box>
                </div>
                <p></p>
                {list.map((info, i) => {
                    const color = info.money<0 ? "red" : "blue";
                    return(
                    <div>
                    <Box style={{display:"inline-block"}}>
                        <ExplaDiv style = {{width:"200px", fontSize:"30px", margin:"25px 970px auto auto", textAlign:"left"}}><u>{String(`${info.title}`)}</u></ExplaDiv>
                        <ExplaDiv style = {{width:"200px", fontSize:"30px", margin:"25px 0px auto auto"}}> <p style={{color:color, height:"0px"}}>{String(`${info.money}`).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</p></ExplaDiv>
                        <br/><br/>
                        <hr/>
                        <ExplaDiv style = {{width:"90%", fontSize:"30px", margin:"25px auto auto auto", textAlign:"left"}}>거래처&emsp;{String(`${info.content}`)}</ExplaDiv>
                        <ExplaDiv style = {{width:"90%", fontSize:"30px", margin:"25px auto auto auto", textAlign:"left"}}>날짜&emsp;&emsp;{String(`${info.date}`)}</ExplaDiv>
                        <ExplaDiv style = {{width:"90%", fontSize:"30px", margin:"25px auto auto auto", textAlign:"left"}}>메모&emsp;&emsp;{String(`${info.memo}`)}</ExplaDiv>
                        <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
                    </Box>
                    <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
                    </div>
                    );
                })}
            </ListWrapper>
            </ContentWrapper>
            <Footer/>
            </Wrapper>
        </Fix>
    );
}

export default List;