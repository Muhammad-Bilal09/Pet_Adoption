import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { sendMessageToFirestore, listenForMessages, endConversation } from '../../redux/slice/conversationSlice';

const useMessage = () => {
  const dispatch = useDispatch();
  const conversation = useSelector((state: RootState) => state.conversation);
  const [message, setMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    let unsubscribe: any;
    if (conversation.isActive && conversation.petOwnerId) {
      unsubscribe = listenForMessages(conversation.petOwnerId, dispatch);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [conversation.isActive, conversation.petOwnerId, dispatch]);

  const handleSendMessage = () => {
    if (message.trim() && conversation.petOwnerId) {
      sendMessageToFirestore('User', message, conversation.petOwnerId!);  // Assert petOwnerId is not null
      setMessage('');
  
      // Simulate owner typing
      setIsTyping(true);
      setTimeout(() => {
        sendMessageToFirestore('Owner', 'Thanks for your message, I will get back to you soon!', conversation.petOwnerId!);
        setIsTyping(false);
      }, 2000);
    }
  };
  

  const handleEndConversation = () => {
    dispatch(endConversation());
  };

  return {
    conversation,
    message,
    setMessage,
    handleSendMessage,
    handleEndConversation,
    isTyping,
  };
};

export default useMessage;
