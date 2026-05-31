import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { dataApi } from "@/api/dataApi";
import { isSupabaseConfigured, supabase } from "@/api/supabaseClient";
import { appPath } from "@/lib/app-url";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState(null);

  const loadUser = useCallback(async (authUser) => {
    if (!authUser) {
      setUser(null);
      return;
    }
    const profile = await dataApi.profiles.getMe(authUser.id);
    setUser({
      ...authUser,
      perspective: profile?.perspective || null,
    });
  }, []);

  const checkUserAuth = useCallback(async () => {
    setIsLoadingAuth(true);
    setAuthError(null);
    try {
      if (!isSupabaseConfigured) {
        throw new Error("Chýba konfigurácia Supabase v .env.local");
      }
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      await loadUser(data.session?.user || null);
    } catch (error) {
      setUser(null);
      setAuthError({ type: "auth_error", message: error.message });
    } finally {
      setAuthChecked(true);
      setIsLoadingAuth(false);
    }
  }, [loadUser]);

  useEffect(() => {
    checkUserAuth();
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      loadUser(session?.user || null).catch((error) => {
        setAuthError({ type: "auth_error", message: error.message });
      });
    });
    return () => data.subscription.unsubscribe();
  }, [checkUserAuth, loadUser]);

  const refreshProfile = useCallback(async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    await loadUser(data.user);
  }, [loadUser]);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = appPath("/login");
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: Boolean(user),
      isLoadingAuth,
      authChecked,
      authError,
      checkUserAuth,
      refreshProfile,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
