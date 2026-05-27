import { create } from 'zustand';
import { getUserProfile, updateUserProfile, UserProfile } from '@/lib/api';

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<UserProfile | null>;
  updateProfile: (data: Partial<UserProfile>) => Promise<UserProfile>;
  setProfile: (profile: UserProfile | null) => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  loading: false,
  error: null,
  fetchProfile: async () => {
    if (get().loading) return get().profile;
    set({ loading: true, error: null });
    try {
      const profile = await getUserProfile();
      set({ profile, loading: false });
      return profile;
    } catch (err) {
      console.error('Failed to fetch profile in store:', err);
      set({ error: err instanceof Error ? err.message : 'Failed to fetch profile', loading: false });
      return null;
    }
  },
  updateProfile: async (data: Partial<UserProfile>) => {
    set({ loading: true, error: null });
    try {
      const updated = await updateUserProfile(data);
      set({ profile: updated, loading: false });
      return updated;
    } catch (err) {
      console.error('Failed to update profile in store:', err);
      set({ error: err instanceof Error ? err.message : 'Failed to update profile', loading: false });
      throw err;
    }
  },
  setProfile: (profile) => set({ profile })
}));
