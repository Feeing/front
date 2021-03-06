import Header from '../../components/Header';
import styled from 'styled-components';
import BlankTop from '../../components/BlankTop';
import Footer from '../../components/Footer';
import Explanation from '../../components/Explanation';
import Button from '../../components/Button';
import {useHistory, Link} from 'react-router-dom';
import ButtonGroup from '../../components/ButtonGroup';
import React, {useState} from 'react';
import icon from '../../assets/dropdownicon.jpg';
import { useEffect } from 'react';
import {getQna} from '../../_actions/user_action';
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
`;

const ListWrapper = styled.div`
    width: 1500px;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    margin: 10px auto auto 20px;
`;

const GrayList = styled.div`
    width: 100%;
    height: 60px;
    background-color: #F5F5F5;
    display: flex;
    flex-direction: row;
    border: solid 1px;
`;

const TitleButton = styled.button`
    border:none;
    width:45%; 
    background:#F5F5F5; 
    margin-left:40px; 
    font-size:20px; 
    margin-top:10px;
    font-family: "NanumSquare";
`; 

const QnA = ({match}) => {
    const {group_name, group_id} = match.params;
    const dispatch = useDispatch();
    const history = useHistory();
    let show = [];
    const [num, setNum] = useState(0);
    const [isShowed, setIsShowed]= useState([]);
    const [qna, setQna] = useState([]);
    const [isSet, setIsSet] = useState('false');

    const setShowArray = async qna => {
        const nextshow = show.concat({id: qna.id, opened: 'false'});
        show = nextshow;
    };

    const onToggle = async (id) => {
        let show = isShowed;
        show.map((info) => {
            if (info.id === id) {
                if(info.opened==='true'){
                    info.opened='false';
                }
                else{
                    if(info.opened==='false'){
                        info.opened='true';
                    }
                }
            }
        });
        setIsShowed(show);
        setNum(num+1);
        console.log(isShowed);
    };

    const setting = async(arr)=>{
        if(isSet==='false'){
            console.log("2",arr);
            arr.map(async (qna) => {
                await setShowArray(qna);
            });
            setIsShowed(show);
        }
        else{
            isShowed.map(async (q) => {
                await setShowArray(q);
            });
        }
    }

    useEffect(() => {
        let arr=[];
        if(isSet==='false'){
            dispatch(getQna(group_id))
            .then (response => {
                if(response.payload){
                    arr=response.payload;
                    setting(arr);
                    console.log("1",arr);
                    setQna(response.payload);
                }
                else{
                    console.log("error")
                }
            })
            setIsSet('true');
        }
        setting(arr);
    },[num]);

    return(
        <Fix>
            <Wrapper>
            <Header></Header>
            <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
            <ContentWrapper>
            <ButtonGroup btnlist="#BBBBBB" btnnotice="#BBBBBB" btnqna="#2BA700" txtlist="#FFFFFF" txtnotice="#FFFFFF" txtqna="#FFFFFF" group_name={group_name} group_id={group_id}/>
            <ListWrapper style={{textAlign:"center"}}>
                <div style={{display:"flex", flexDirection:"row"}}>
                <Explanation size="40" margin_top="20" contents={String(`<${group_name}> ??????`)}/>
                <Button style={{marginRight:"0px", marginTop:"20px"}}height="50" width='80' font="23" background="#008F39" color="#FAECEC" round="30">??????</Button>
                </div>
                <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
                <GrayList style={{backgroundColor:"#DADBDB"}}>
                    <Explanation width="6" margin_left="40" size="25" margin_top="15" contents="??????"/>
                    <Explanation width="8" margin_left="40" size="25" margin_top="15" contents="????????????"/>
                    <Explanation width="45" margin_left="40" size="25" margin_top="15" contents="??????"/>
                    <Explanation width="15" margin_left="40" size="25" margin_top="15" contents="?????????"/>
                    <Explanation width="25" margin_left="40" size="25" margin_top="15" contents="?????????"/>
                </GrayList>
                {qna.map((question, i) => {
                    const answered = Number(question.answers.length)<=0 ? '???????????????' : '?????? ??????';
                    return (
                    <div>
                    <GrayList>
                        <Explanation width="6" margin_left="40" size="20" margin_top="15" contents={String(`${question.id}`)}/>
                        <Explanation width="8" margin_left="40" size="20" margin_top="15" contents={String(answered)}/>
                        <TitleButton type="button" onClick={() => {onToggle(question.id)}}>{question.title}</TitleButton>
                        <Explanation width="15" margin_left="40" size="20" margin_top="15" contents={String(`${question.writer}`)}/>
                        <Explanation width="25" margin_left="40" size="20" margin_top="15" contents={String(`${String(question.pub_date).substring(0,10)}`)}/>
                    </GrayList>
                    {isShowed.map((txt, i) => {
                            if(txt.id===question.id){ 
                                if(txt.opened==='true') {
                                    return (
                                        <div>
                                        <div style={{width: "94.7%", fontSize:"20px", backgroundColor:"white", border:"solid 1px", padding:"10px 40px 30px 40px"}}><p style={{marginTop:"10px",fontFamily:"NanumSquare", fontSize:"25px"}}>Q</p>{question.body}</div>
                                        <div style={{width: "94.7%", fontSize:"20px", backgroundColor:"#DDDDDD", border:"solid 1px", padding:"10px 40px 30px 40px"}}>{question.answers.length<=0? '?????? ????????? ????????? ???????????????.': <><p style={{marginTop:"10px",fontFamily:"NanumSquare", fontSize:"25px"}}>A</p>{question.answers[0].content}</>}</div>
                                        </div>
                                    );
                                }
                            }
                        })
                    }
                    </div>
                    )
                })}
            </ListWrapper>
            </ContentWrapper>
            <Footer/>
            </Wrapper>
        </Fix>
    );
}

export default QnA;