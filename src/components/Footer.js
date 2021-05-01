import styled from "styled-components";
import BlankTop from "./BlankTop";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width:100%;
    height:150px;
`
const Footer = () => {
    return(
        <Wrapper>
            <hr style={{width: "100%", height:"2px", backgroundColor:"green"}}/>
            Copyright ⓒ 2021. Feeing <br/> Hanwool Park, Yoonjae Choi
        </Wrapper>
    )
}

export default Footer;