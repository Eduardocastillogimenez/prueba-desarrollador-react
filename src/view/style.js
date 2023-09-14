import styled from 'styled-components';

export const Container = styled.div`

    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-form{
        width: 500px;
        height: 500px;
        padding: 90px;
        background-color: aliceblue;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
`;

export const Google_login = styled.button`
    width: 100%;
    margin-top: 30px;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: white;

    &:hover{
        background-color: #1677ff;
        color: white;
    }
`;