import styled from "styled-components";

export const FormContent = styled.div`

display: grid;
grid-template-columns: repeat(2, 1fr);
grid-gap: 20px;

.field{
height:40px;
}


`
export const AttachButton=styled.div`
.attachButton{
  width: 140px;
    height: 41px;
    background: #36AFFA;
    border-radius: 10px;
    color: white;
    font-weight: 700;
    font-size:14px;
    
}
    .submitButton {
    width: 140px;
    height: 41px;
    margin-left: 89%;
    background: #36affa;
    border-radius: 10px;
    color: white;
    font-weight: 700;
    font-size: 14px;
  }
`
export const DropDownContainer=styled.div`
.anticon svg {
  color: #adacb0 !important;
}
`