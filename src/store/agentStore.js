import { create } from "zustand";

const useAgentStore = create((set) => ({
  property: null,
  setProperty: (property) => {
    set({ property: property });
  },
  realEstateAgentRef: null,
  setRealEstateAgentRef: (ref) => set({ realEstateAgentRef: ref }),
  isAgentExpanded: false,
  setIsAgentExpanded: (isExpanded) => set({ isAgentExpanded: isExpanded }),
}));

export default useAgentStore;
