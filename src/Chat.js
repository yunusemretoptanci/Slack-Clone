import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {useSelector} from "react-redux";
import { selectRoomId } from './features/appSlice';
import ChatInput from './ChatInput';
import {useCollection, useDocument} from "react-firebase-hooks/firestore";
import { db } from './firebase';
import Message from './Message';

function Chat() {
    const chatRef=useRef(null);
const roomId=useSelector(selectRoomId);
const[roomDetails]=useDocument(roomId && db.collection('rooms').doc(roomId))

const[roomMessages,loading,error]=useCollection(
    roomId&&
    db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc")
);

useEffect(()=>{
chatRef?.current?.scrollIntoView({
    behavior:"smooth",
});
},[roomId,loading])

return(
   <ChatContainer>
   {roomDetails&&roomMessages&&(
    <>
       <Header>
           <HeaderLeft>
               <h4>
                   <strong>#{roomDetails?.data().name}</strong>

               </h4>
               <StarOutlineIcon />
           </HeaderLeft>

            <HeaderRight>
                <p>
                    <InfoOutlinedIcon /> Details
                </p>
            </HeaderRight>
       </Header>

       <ChatMessages>
        {roomMessages?.docs.map(doc=>{
            const {message,timestamp,user,userImages}=doc.data();
            return (
                <Message 
                    key={doc.id}
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    userImages={userImages}
                />
            )
        })}
        <ChatBottom ref={chatRef} />
       </ChatMessages>

       <ChatInput
       chatRef={chatRef}
       channelName={roomDetails?.data().name}
        channelId={roomId}
        />
       </>
   )}
  
   </ChatContainer>
  )
}

export default Chat
const ChatBottom=styled.div`
padding-bottom: 200px;
`;
const ChatMessages=styled.div`

`;

const Header=styled.div`
display: flex;
justify-content: space-between;
padding: 20px;
border-bottom: 1px solid lightgray;
`;

const HeaderRight=styled.div`
>p{
    display: flex;
    align-items: center;
    font-size:14px;
}

>p>.MuiSvgIcon-root{
    margin-right: 5px !important;
    font-size: 16px;
}
`;

const HeaderLeft=styled.div`
display: flex;
align-items: center;

>h4{
    display: flex;
    text-transform: lowercase;
    margin-right:10px;
}

`;

const ChatContainer=styled.div`
flex:0.7;
flex-grow: 1;
overflow-y: scroll;
margin-top: 60px;
`;