import { Divider } from 'antd';
import {useHistory, Link} from "react-router-dom";
import styled from 'styled-components';
import Logo from '../assets/logo.jpg';
import Button from './Button'

const MyIcon = styled.img`
    width: 240px;
`;

MyIcon.defaultProps = {
    src: Logo
};

const Upper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const Header = () => {
    const history = useHistory();

    const LogOut = async (evt) => {
        window.localStorage.setItem("isAuth", "false");
        history.push(`/`);
    }

    switch(window.localStorage.getItem("isAuth")){
        case "false":
            return (
                <div>
                <Upper>
                    <Link to ="/">
                        <MyIcon></MyIcon>
                    </Link>
                    <br/>
                </Upper>
                <hr style={{width: "100%", height:"2px", backgroundColor:"green"}}/>
                </div>
            );
        case null:
            return(
                <div>
                <Upper>
                    <Link to ="/">
                        <MyIcon></MyIcon>
                    </Link>
                    <br/>
                </Upper>
                <hr style={{width: "100%", height:"2px", backgroundColor:"green"}}/>
                </div>
            );
        case "true":
            return(
                <div>
                <Upper>
                    <Link to ="/">
                        <MyIcon></MyIcon>
                    </Link>
                    <br/>
                    <Button style={{marginLeft:"70%"}}font="18" width="120" height="35" marginTop="10" marginRight="10" border="#00A324" background="#FFFFFF" round="15" onClick={()=>history.push(`/mypage`)}>My Page</Button>
                    <Button style={{marginLeft:"20px"}}font="18" width="120" height="35" marginTop="10" marginRight="10" color="#FAECEC" background="#00A324" round="15" onClick={LogOut}>Log out</Button>
                </Upper>
                <hr style={{width: "100%", height:"2px", backgroundColor:"green"}}/>
                </div>
            );
    }
}

export default Header;