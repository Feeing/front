import styled from "styled-components";
import BlankTop from "./BlankTop";
import Button from "./Button";
import {useHistory, Link} from "react-router-dom"

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 120px 10px 20px 0px;
    padding: 10px auto auto 0px;
`

const ButtonGroup = ({btnlist, btnnotice, btnqna, txtlist,txtnotice,txtqna, group_name, group_id}) => {
    const history = useHistory();
    return(
        <ButtonWrapper>
            <Button font="30" width="200" height="56" marginTop="50" marginRight="10" background={btnlist} color={txtlist} onClick={()=>history.push(`/list/${group_name}/${group_id}`)}>거래내역</Button>
            <Button font="30" width="200" height="56" marginTop="50" marginRight="10" background={btnnotice} color={txtnotice} onClick={()=>history.push(`/notice/${group_name}/${group_id}`)}>공지</Button>
            <Button font="30" width="200" height="56" marginTop="50" marginRight="10" background={btnqna} color={txtqna} onClick={()=>history.push(`/qna/${group_name}/${group_id}`)}>문의</Button>
        </ButtonWrapper>
    )
}

export default ButtonGroup;