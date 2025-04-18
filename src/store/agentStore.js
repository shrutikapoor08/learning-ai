import { create } from "zustand";

const useAgentStore = create((set) => ({
  property: {},
  setProperty: (property) => {
    console.log("setProperty", property);
    set({ property: property });
  },
  realEstateAgentRef: null,
  setRealEstateAgentRef: (ref) => set({ realEstateAgentRef: ref }),
}));

export default useAgentStore;
