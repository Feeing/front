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
import {getNotice} from '../../_actions/user_action';
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

const Notice = ({match}) => {
    const {group_name, group_id} = match.params
    const dispatch = useDispatch();
    const history = useHistory();
    let show = [];
    const [num, setNum] = useState(0);
    const [isShowed, setIsShowed]= useState([]);
    const [notice, setNotice] = useState([]);
    const [isSet, setIsSet] = useState('false');
    const [founder, setFounder] = useState('');

    const setShowArray = async notice => {
        const nextshow = show.concat({id: notice.id, opened: 'false'});
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
        console.log(isShowed)
        setNum(num+1);
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
            dispatch(getNotice(group_id))
            .then (response => {
                console.log(response.payload)
                if(response.payload){
                    arr=response.payload;
                    setting(arr);
                    setNotice(response.payload);
                    if(response.payload.length>0){setFounder(response.payload[0].founder_name)};
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
            <ButtonGroup btnlist="#BBBBBB" btnnotice="#2BA700" btnqna="#BBBBBB" txtlist="#FFFFFF" txtnotice="#FFFFFF" txtqna="#FFFFFF" group_name={group_name} group_id={group_id}/>
            <ListWrapper style={{textAlign:"center"}}>
                <div style={{display:"flex", flexDirection:"row"}}>
                <Explanation size="40" margin_top="20" contents={String(`<${group_name}> ??????`)}/>
                {founder===window.localStorage.getItem('id')?
                <Button style={{marginRight:"0px", marginTop:"20px"}}height="50" width='80' font="23" background="#008F39" color="#FAECEC" round="30">??????</Button>
                : null
                }
                </div>
                <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
                <GrayList style={{backgroundColor:"#DADBDB"}}>
                    <Explanation width="8" margin_left="40" size="25" margin_top="15" contents="??????"/>
                    <Explanation width="45" margin_left="40" size="25" margin_top="15" contents="??????"/>
                    <Explanation width="15" margin_left="40" size="25" margin_top="15" contents="?????????"/>
                    <Explanation width="25" margin_left="40" size="25" margin_top="15" contents="?????????"/>
                </GrayList>
                {notice.map((info, i) => {
                    return (
                    <div>
                    <GrayList>
                        <Explanation width="8" margin_left="40" size="20" margin_top="15" contents={String(`${info.id}`)}/>
                        <TitleButton type="button" onClick={() => {onToggle(info.id)}}>{info.title}</TitleButton>
                        <Explanation width="15" margin_left="40" size="20" margin_top="15" contents={String(`${info.writer}`)}/>
                        <Explanation width="25" margin_left="40" size="20" margin_top="15" contents={String(`${String(info.pub_date).substring(0,10)}`)}/>
                    </GrayList>
                    {isShowed.map((txt, i) => {
                            if(txt.id===info.id){ 
                                if(txt.opened==='true') {
                                return (<div style={{width: "94.7%", fontSize:"20px", backgroundColor:"white", border:"solid 1px", padding:"20px 40px"}}>{info.body.split('\n').map((line)=>{return <>{line}<br/></>})}</div>);}
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

export default Notice;