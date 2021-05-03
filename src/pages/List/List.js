import Header from '../../components/Header';
import styled from 'styled-components';
import BlankTop from '../../components/BlankTop';
import Footer from '../../components/Footer';
import Explanation from '../../components/Explanation';
import Button from '../../components/Button';
import {useHistory, Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import ButtonGroup from '../../components/ButtonGroup';
import {getHistory, updateGroup, updateTitle, updateMemo} from '../../_actions/user_action';
import {useDispatch} from 'react-redux';
import Loading from '../../components/Loading';

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

const Input = styled.input`
    width: 480px;
    height: 80px;
    backgroud-color: #EAEAEA;
    margin-top: 50px;
    font-family: "NanumSquare";
    font-size: 20px;
`

const List = ({match}) => {
    const {group_name, group_id} = match.params
    const history = useHistory();
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [founder, setFounder] = useState('');
    const [updateVar, setUpdateVar] = useState(0);
    const [titlelist, setTitlelist] = useState([]);
    const [memolist, setMemolist] = useState([]);
    const [isLoading, setIsLoading] = useState([]);

    useEffect (() => {
        dispatch(getHistory(group_id))
        .then (response => {
            if(response.payload){
                setList(response.payload);
                console.log(response.payload)
                if(response.payload.length>0){setFounder(response.payload[0].founder_name);}
            }
            else{
                console.log("error")
            }
        })
    },[updateVar]);

    const titleChange = async (e) => {
        const{name, value} = e.target;
        setTitlelist({
            ...titlelist,
            [name] : value
        })
    }    

    const titleSubmit = async (title, id) => {
        console.log("titlesumit",id);
        dispatch(updateTitle(id, {"title": title}))
        .then(response => {
            if(response.payload){
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
        }
        else{
            alert("예상치 못한 문제가 발생했습니다.");
        }
        })
        setUpdateVar(updateVar+1);
    }

    const memoChange = async (e) => {
        const{name, value} = e.target;
        setMemolist({
            ...memolist,
            [name] : value
        })
    }    

    const memoSubmit = async (memo, id) => {
        console.log("memosumit",id);
        dispatch(updateMemo(id, {"memo": memo}))
        .then(response => {
            if(response.payload){
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
        }
        else{
            alert("예상치 못한 문제가 발생했습니다.");
        }
        })
        setUpdateVar(updateVar+1);
    }

    let total = 0;
    let balance = 0;
    list.map((his, i) => {
        if(i==1) {
            balance = his.balance;
            total = 0;
        }
        if(his.money < 0){
            total += his.money;
        }
    })

    const update = () => {
        setIsLoading('pending');
        dispatch(updateGroup(group_id))
        .then (response => {
            if(response.payload){
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
                setIsLoading('resolved');
                alert("거래 내역이 갱신되었습니다.");
            }
            else{
                alert("예상치 못한 문제로 거래 내역이 갱신되지 않았습니다.");
            }
        })
    }

    return(
        <Fix>
            <Wrapper>
            <Header/>
            <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
            <ContentWrapper>
            <ButtonGroup btnlist="#2BA700" btnnotice="#BBBBBB" btnqna="#BBBBBB" txtlist="#FFFFFF" txtnotice="#FFFFFF" txtqna="#FFFFFF" group_name={group_name} group_id={group_id}/>
            <ListWrapper>
                <div style={{display:"flex", flexDirection:"row"}}>
                {isLoading==="pending" ? 
                    <Loading></Loading>
                    :
                    <Explanation style={{display: "inline-block", width:"auto"}}size="40" margin_top="52" margin_left="0" contents={String(`<${group_name}> 거래내역`)}/>
                }
                <Box style={{marginTop:"0px", width:"600px", flexDirection:"row", textAlign:"center"}}>
                    <ExplaDiv>현재 잔액 &nbsp;&nbsp;&nbsp;&nbsp; {String(balance).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원&nbsp;&nbsp;&nbsp;</ExplaDiv>
                    <ExplaDiv>누적 지출액 &nbsp;&nbsp;&nbsp; {String(`${total}`).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</ExplaDiv>
                </Box>
                {founder===window.localStorage.getItem('id') ? 
                <div style={{display: "flex", flexDirection:"row"}}>
                    <Button style={{display: "inline-block", marginLeft:"30px"}}height="50" width='80' font="23" background="#008F39" color="#FAECEC" round="30" marginRight="20" onClick={update}>갱신</Button>
                </div>
                : null}
                </div>
                <p></p>
                {list.map((info, i) => {
                    if(i===0) return null;
                    const color = info.money<0 ? "red" : "blue";
                    return(
                    <div>
                    <Box style={{display:"inline-block"}}>
                        {info.title===null ?
                          window.localStorage.getItem('id') === founder ?
                            <div style={{display:"inline-block"}}>
                            <Input style={{marginRight:"20px", height:"50px"}}placeholder="   제목을 입력하세요" name={info.id} value={titlelist[info.id]} onChange = {titleChange}/>
                            <Button style={{display: "inline-block", marginRight:"500px"}}height="50" width='140' font="23" background="#008F39" color="#FAECEC" onClick={() => titleSubmit(titlelist[info.id], info.id)}> 입력</Button>
                            </div>
                            :
                            <ExplaDiv style = {{display:"inline-blok",width:"400px", fontSize:"30px", margin:"25px 770px auto auto", textAlign:"left"}}><u>제목 없음</u></ExplaDiv>
                        :
                        <ExplaDiv style = {{display:"inline-blok",width:"400px", fontSize:"30px", margin:"25px 770px auto auto", textAlign:"left"}}><u>{info.title}</u></ExplaDiv>
                        }
                        <ExplaDiv style = {{display:"inline-blok",width:"200px", fontSize:"30px", margin:"25px 0px auto auto"}}> <p style={{color:color, height:"0px"}}>{String(`${info.money}`).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</p></ExplaDiv>
                        <br/><br/>
                        <hr/>
                        <ExplaDiv style = {{width:"90%", fontSize:"30px", margin:"25px auto auto auto", textAlign:"left"}}>거래내용&emsp;{info.content}</ExplaDiv>
                        <ExplaDiv style = {{width:"90%", fontSize:"30px", margin:"25px auto auto auto", textAlign:"left"}}>&nbsp;&nbsp;날짜&nbsp;&emsp;&emsp;{info.date}</ExplaDiv>
                        {info.memo===null ?
                        window.localStorage.getItem('id') === founder ?
                        <div style={{display:"inline-block"}}>
                        <ExplaDiv style = {{display:"inline-block", fontSize:"30px", margin:"10px auto auto 25px", textAlign:"left"}}>&nbsp;&nbsp;메모&nbsp;&emsp;&emsp;</ExplaDiv>
                        <Input style={{display:"inline-block", marginTop:"25px", marginRight:"20px", height:"50px"}}placeholder="   메모를 입력하세요" name={info.id} value={memolist[info.id]} onChange = {memoChange}/>
                        <Button style={{display: "inline-block", marginRight:"590px"}}marginTop="0" height="50" width='140' font="23" background="#008F39" color="#FAECEC" onClick={() => memoSubmit(memolist[info.id], info.id)}>메모 입력</Button>
                        </div>
                        :
                        <ExplaDiv style = {{width:"90%", fontSize:"30px", margin:"25px auto auto auto", textAlign:"left"}}>&nbsp;&nbsp;메모&nbsp;&emsp;&emsp;메모 없음</ExplaDiv>
                        :
                        <ExplaDiv style = {{width:"90%", fontSize:"30px", margin:"25px auto auto auto", textAlign:"left"}}>&nbsp;&nbsp;메모&nbsp;&emsp;&emsp;{info.memo}</ExplaDiv>
                        }
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