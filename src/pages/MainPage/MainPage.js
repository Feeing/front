import Header from '../../components/Header';
import styled from 'styled-components';
import BlankTop from '../../components/BlankTop';
import Footer from '../../components/Footer';
import Explanation from '../../components/Explanation';
import MainImg from '../../assets/Main.png';
import Button from '../../components/Button';
import {useHistory, Link} from 'react-router-dom';

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

const Image = styled.img`
    width: 70%;
    padding: 2vw 0 2vw 0;
`

Image.defaultProps = {
    src: MainImg
};

const ButtonWrapper = styled.div`
    width: 70rem;
    display: flex;
    margin: 2vw 0vw 0vw 5vw;
`

const MainPage = () => {
    const history = useHistory();
    if(window.localStorage.getItem("isAuth")===null) {
        window.localStorage.setItem("isAuth", 'false');
    }
    return(
        <Fix>
            <Wrapper>
            <Header></Header>
            <div style={{display: "flex", flexDirection:"row"}}>
                <div>
                    <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
                    <div style={{width:"45vw", padding:"5vw 0 0 5vw"}}>
                        <Explanation width='50' size='25' color='black' contents="feeing"></Explanation><br/>
                        <Explanation width='100' size='80' font="ChosunBg" color='#00a324' contents="거래 내역을 투명하게"></Explanation><br/><br/>
                        <Explanation width='60' size='20' color='black' contents="공동 자금의 관리를 도와드립니다."></Explanation>
                    </div>
                    {window.localStorage.getItem("isAuth")!=='true'?
                    <ButtonWrapper>
                        <Button width='210' font="30" background="#008F39" color="#FAECEC" round="30" onClick={() => history.push(`/login`)}>Log in</Button>
                        <Button width='210' font="30" background="white" color="#008F39" round="30" border="#008F39" onClick={() => history.push(`/signup`)}>Sign Up</Button>
                    </ButtonWrapper>
                    :
                    <ButtonWrapper></ButtonWrapper>
                }   
                </div>
                <div>
                    <Image/>
                </div>
            </div>
            <Footer/>
            </Wrapper>
        </Fix>
    );
}

export default MainPage;