import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import useMessage from './useMessage'; 
import { styles } from './MessageStyle';

const MessageScreen = () => {
  const {
    conversation,
    message,
    setMessage,
    handleSendMessage,
    handleEndConversation,
    isTyping,
  } = useMessage();

  if (!conversation.isActive) {
    return (
      <View style={styles.centered}>
        <Text>No conversation started</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with {conversation.petName}'s Owner</Text>

      <FlatList
        data={conversation.messages}
        renderItem={({ item }) => {
          const isOwner = item.sender === 'Owner';
          return (
            <View
              style={[
                styles.messageContainer,
                isOwner ? styles.ownerMessage : styles.userMessage,
              ]}
            >
              <Text style={styles.messageSender}>
                {isOwner ? 'Owner' : 'You'}:
              </Text>
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Typing indicator */}
      {isTyping && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={styles.typingText}>Owner is typing...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.endButton}
        onPress={handleEndConversation}>
        <Text style={styles.endButtonText}>End Conversation</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MessageScreen;