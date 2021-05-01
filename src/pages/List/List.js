import Header from '../../components/Header';
import styled from 'styled-components';
import BlankTop from '../../components/BlankTop';
import Footer from '../../components/Footer';
import Explanation from '../../components/Explanation';
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

const List = () => {
    const history = useHistory();
    return(
        <Fix>
            <Wrapper>
            <Header/>
            <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
            <Box>
            <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
            </Box>
            <BlankTop DesktopMargin='3' TabletMargin='3' MobileMargin='1'/>
            <Footer/>
            </Wrapper>
        </Fix>
    );
}

export default List;