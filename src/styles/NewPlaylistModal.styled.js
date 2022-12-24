import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 40%;
    height: 40%;
    padding: 30px;
    transform: translate(-50%, -50%);
    background-image: linear-gradient(15deg, #000000 0%, #202020 74%);
    border-radius: 5px;
    overflow: hidden;
    p{color: white}
`;

const InputTitle = styled.input`
    height: 30px;
    margin-left: 16px;
    font-size: 18px;
    &:focus {
    outline: 3px solid black;
  }
`;

const InputSearch = styled.input`
    height: 24px;
    font-size: 16px;

    &:focus {
        outline: 3px solid black;
    }
`;

export { Container, InputTitle, InputSearch };
