import styled from "styled-components";

const LoginStyle = styled.div`
  display: flex;

  .left {
    width: 40%;
    height: 48rem;
    background-color: rgb(0, 88, 163);
  }
  .left-head {
    display: flex;
    margin-top: 10%;
    align-items: center;
  }
  .logo {
    color: rgb(255, 255, 255);
    margin-left: 10%;
    width: 30%;
  }
  .icon-arrow {
    color: rgb(255, 255, 255);
    margin-left: 6%;
    font-size: 20px;
  }

  .left-note {
    margin-left: 20%;
    width: 60%;
    margin-top: 20%;
  }
  .text1 {
    color: rgb(251, 217, 20);
  }
  .text2 {
    color: rgb(255, 255, 255);
  }
  .left-note p {
    color: rgb(255, 255, 255);
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
  .left-bot {
    position: absolute;
    margin-left: 7.9%;
    bottom: 2%;
    width: 60%;
    color: rgb(255, 255, 255);
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
  .right {
    width: 60%;
  }
  .form {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 6% 30% 20% 10%;
  }
  input {
    display: block;
    box-sizing: border-box;
    width: 90%;
    height: 3rem;
    border-radius: 4px;
    border: 1px solid black;
    padding: 10px 15px;
    margin-bottom: 15px;
    font-size: 14px;
  }
  input[type="submit" i] {
    background: #0058a3;
    border-radius: 64px;
    transition-duration: 0.25s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.4, 1);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-height: 3.5rem;
    padding: 0 2rem;
    width: 90%;
    color: rgb(255, 255, 255);
    font-size: 1.25rem;
    cursor: pointer;
  }
  input[type="checkbox" i] {
    display: block;
    width: 5%;
  }
  .warning {
    color: red;
    margin-top: -2%;
    margin-bottom: 1%;
  }
  .pass {
    position: relative;
  }
  .hide-pass {
    position: absolute;
    top: 8%;
    right: 11%;
    padding: 7px;
  }
  /* .email-false ~ input:focus {
    border: 1px solid #e00751;
  }
  input:focus ~ .email-true {
    border: 1px px solid #0a8a00;
  } */
  .register {
    background: rgb(83 149 205);
    border-radius: 64px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
    padding: 0 2rem;
    width: 44%;
    position: absolute;
    top: 90%;
    right: 33.5%;
    color: white;
    font-size: 1.25rem;
  }
`;
export default LoginStyle;
