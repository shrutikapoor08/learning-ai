import { create } from "zustand";

const useRecommendedPropertyStore = create((set) => ({
  likedProperty: null,
  setLikedProperty: (property) => set({ likedProperty: property }),
  dislikedProperty: null,
  setDislikedProperty: (property) => set({ dislikedProperty: property }),
  recommendedProperties: [],
  setRecommendedProperties: (properties) =>
    set({ recommendedProperties: properties }),
}));

export default useRecommendedPropertyStore;
