import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'; 
import { Message,ConversationState } from '../../types/types';


const initialState: ConversationState = {
  isActive: false,
  petOwnerId: null,
  petName: null,
  messages: [],
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    startConversation(state, action: PayloadAction<{ petOwnerId: string, petName: string }>) {
      state.isActive = true;
      state.petOwnerId = action.payload.petOwnerId;
      state.petName = action.payload.petName;
    },
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    endConversation(state) {
      state.isActive = false;
      state.petOwnerId = null;
      state.petName = null;
      state.messages = [];
    },
  },
});

export const { startConversation, setMessages, endConversation } = conversationSlice.actions;
export default conversationSlice.reducer;

export const sendMessageToFirestore = (sender: 'User' | 'Owner', message: string, petOwnerId: string) => {
  firestore()
    .collection('conversations')
    .doc(petOwnerId)
    .collection('messages')
    .add({
      sender,
      message,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
};

export const listenForMessages = (petOwnerId: string, dispatch: any) => {
  return firestore()
    .collection('conversations')
    .doc(petOwnerId)
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .onSnapshot(snapshot => {
      const messages: Message[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          sender: data.sender || 'Unknown',
          message: data.message || '',
          timestamp: data.timestamp || null,
        } as Message;
      });
      dispatch(setMessages(messages));
    });
};