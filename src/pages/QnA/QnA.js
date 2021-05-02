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

    useEffect(() => {
        if(isSet==='false'){
            dispatch(getQna(group_id))
            .then (response => {
                console.log(response.payload)
                if(response.payload){
                    setQna(response.payload);
                }
                else{
                    console.log("error")
                }
            })
            setIsSet('true');
        }
        qna.map(async (qna) => {
            await setShowArray(qna);
        });
        setIsShowed(show);
        isShowed.map(async (showed) => {
            await setShowArray(showed);
        });
    },[isSet]);

    return(
        <Fix>
            <Wrapper>
            <Header></Header>
            <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
            <ContentWrapper>
            <ButtonGroup btnlist="#BBBBBB" btnnotice="#BBBBBB" btnqna="#2BA700" txtlist="#FFFFFF" txtnotice="#FFFFFF" txtqna="#FFFFFF" group_name={group_name} group_id={group_id}/>
            <ListWrapper style={{textAlign:"center"}}>
                <Explanation size="40" margin_top="20" contents={String(`<${group_name}> 문의`)}/>
                <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
                <GrayList style={{backgroundColor:"#DADBDB"}}>
                    <Explanation width="8" margin_left="40" size="25" margin_top="15" contents="번호"/>
                    <Explanation width="10" margin_left="40" size="25" margin_top="15" contents="답변여부"/>
                    <Explanation width="40" margin_left="40" size="25" margin_top="15" contents="제목"/>
                    <Explanation width="15" margin_left="40" size="25" margin_top="15" contents="작성자"/>
                    <Explanation width="25" margin_left="40" size="25" margin_top="15" contents="작성일"/>
                </GrayList>
                {qna.map((question, i) => {
                    const answered = Number(question.answers.length)<=0 ? '답변미완료' : '답변 완료';
                    return (
                    <div>
                    <GrayList>
                        <Explanation width="8" margin_left="40" size="20" margin_top="15" contents={String(`${question.id}`)}/>
                        <Explanation width="10" margin_left="40" size="20" margin_top="15" contents={String(answered)}/>
                        <TitleButton type="button" onClick={() => {onToggle(question.id)}}>{question.title}</TitleButton>
                        <Explanation width="15" margin_left="40" size="20" margin_top="15" contents={String(`${question.writer}`)}/>
                        <Explanation width="25" margin_left="40" size="20" margin_top="15" contents={String(`${String(question.pub_date).substring(0,10)}`)}/>
                    </GrayList>
                    {isShowed.map((txt, i) => {
                            if(txt.id===question.id){ 
                                if(txt.opened==='true') {
                                    return (
                                        <div>
                                        <div style={{width: "94.7%", fontSize:"20px", backgroundColor:"white", border:"solid 1px", padding:"20px 40px"}}>{question.body}</div>
                                        <div style={{width: "94.7%", fontSize:"20px", backgroundColor:"#DDDDDD", border:"solid 1px", padding:"20px 40px"}}>{question.answers.length<=0? '아직 답변이 달리지 않았습니다.': question.answers[0].content}</div>
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