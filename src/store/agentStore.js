import { create } from "zustand";

const useAgentStore = create((set) => ({
  property: {},
  setProperty: (property) => set({ property: property }),
}));

export default useAgentStore;
