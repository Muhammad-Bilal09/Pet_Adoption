export type Pet = {
    id: string;
    petName: string;
    type: string;
    petAge: string;
    amount: string;
    imageUrl: string;
    description: string;
    ownerId: string;
  };
  
export type AuthStackParamList = {
    Login: undefined;
    SignUp: undefined;
  };
  
  export type AppStackParamList = {
    Home: undefined;
    Adopt: undefined;
    PetAdoption: undefined;
    Donate: undefined;
    Profile: undefined;
    AddPet: undefined;
    Message: undefined;
    Favourite: undefined;
    BottomTabs: undefined;
    SideBar: undefined;
  };

  export type User ={
    id: string;
    email: string | null;
    name: string | null;
  }
  
  export type AuthState ={
    user: User | null;
    isAuthenticated: boolean;
    error: string | null;
  }

  import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'; 

  export type Message ={
    sender: string;
    message: string;
    timestamp: FirebaseFirestoreTypes.Timestamp | null; 
  }
  
  export type ConversationState ={
    isActive: boolean;
    petOwnerId: string | null;
    petName: string | null;
    messages: Message[];  
  }
 
  export type FavoritesState= {
    favorites: Pet[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }


  export type PetsState = {
    selectedPet: Pet | null;
  };

  export type ProfileState ={
    username: string;
    email: string;
    profileImage: string | null;
  }

  export type RootStackParamAdoptList = {
    Home: undefined;
    Adopt: undefined;
    Donate: undefined;
    AddPet: undefined;
    Favourite: undefined;
    Message: { petOwnerId: string; petName: string };
    Profile: undefined;
  };
  export type RootStackParamList = {
    Home: undefined;
    Adopt: undefined;
    Donate: undefined;
    AddPet: undefined;
    Favourite: undefined;
    Message: undefined;
    Profile: undefined;
    PetAdoption: { pet: Pet } | undefined; 
  };
  
  