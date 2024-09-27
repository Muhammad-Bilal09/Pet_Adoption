import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { RootState } from '../../redux/store';
import { removeFavorite, addFavorite } from '../../redux/slice/favoritesSlice';

export const useFavorites = () => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;
      try {
        const userFavoritesRef = firestore()
          .collection('users')
          .doc(user.id)
          .collection('favorites');

        const snapshot = await userFavoritesRef.get();
        snapshot.forEach(doc => {
          const petData = doc.data();
          const pet = {
            id: doc.id,
            petName: petData.petName,
            type: petData.type,
            petAge: petData.petAge,
            amount: petData.amount,
            imageUrl: petData.imageUrl,
            description: petData.description,
            ownerId: petData.ownerId,
          };
          dispatch(addFavorite(pet));
        });
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [user, dispatch]);

  const removeFavoritePet = (petId: string) => {
    dispatch(removeFavorite(petId));
  };

  return {
    favorites,
    removeFavoritePet,
  };
};
