import { create } from "zustand";

const useRecommendedPropertyStore = create((set) => ({
  likedProperty: null,
  setLikedProperty: (property) => set({ recommendedProperty: property }),
  dislikedProperty: null,
  setDislikedProperty: (property) => set({ recommendedProperty: property }),
  recommendedProperties: [],
  setRecommendedProperties: (properties) =>
    set({ recommendedProperties: properties }),
}));

export default useRecommendedPropertyStore;
