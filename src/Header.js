import React from 'react'
import styled from "styled-components"
import { Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Header() {
    const[user]=useAuthState(auth);

  return (
    <HeaderContainer>
        <HeaderLeft>
<HeaderAvatar 
onClick={()=>auth.signOut()}
    src= {user?.photoURL}
    alt= {user?.displayName}
/>
<AccessTimeIcon />
        </HeaderLeft>

<HeaderSearch>
<SearchIcon />
<input placeholder='Search Slack-Test'/>
</HeaderSearch>

<HeaderRight>
<HelpOutlineIcon />
</HeaderRight>

    </HeaderContainer>
  )
}

export default Header

const HeaderSearch=styled.div`
flex: 0.4;
opacity: 1;
border-radius: 6px;
background-color: #421f44;
text-align: center;
display: flex;
padding: 0 50px;
border: 1px gray solid;
align-items:center;

>input {
    background-color: transparent;
    border: none;
    text-align: center;
    outline:0;
    color:white;
    min-width: 30vw;
}
`;

const HeaderContainer=styled.div`
display: flex;
position: fixed;
justify-content: space-between;
padding: 10px 0;
background-color: var(--slack-color);
width: 100%;
color:white;
`;

const HeaderRight=styled.div`
display: flex;
align-items: center;
flex: 0.3;

>.MuiSvgIcon-root{
    margin-left:auto;
    margin-right: 20px;
}
`;


const HeaderLeft=styled.div`
flex:0.3;
display: flex;
align-items: center;
margin-left: 20px;
>.MuiSvgIcon-root{
    margin-left: auto;
    margin-right: 30px;
}
`;

const HeaderAvatar=styled(Avatar)`
cursor: pointer;

:hover{
    opacity: 0.8;
}
`;
