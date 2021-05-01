import styled from "styled-components";

const ExplaDiv = styled.div`
  width: ${(props) => props.width || 100}%;
  font-size: ${(props => props.size || 16)}px;
  color: ${(props) => props.color || "black"};
  font-family: ${(props) => props.font || "NanumSquare" };
  height: auto;
  margin-top: ${(props) => props.margin_top || 0}px;
  margin-left: ${(props) => props.margin_left || 0}px;
`;

const Explanation = ({ width, size, color, font, contents, margin_top, margin_left }) => { 
  return (
    <ExplaDiv
      width={width}
      size={size}
      color={color}
      font = {font}
      margin_top= {margin_top}
      margin_left = {margin_left}
    >{contents}</ExplaDiv>
  );
};

export default Explanation;
