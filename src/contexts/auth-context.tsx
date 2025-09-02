
"use client";

import React,
{
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const ADMIN_EMAILS = ['kartavyasoni175@gmail.com'];

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAdmin(!!user && ADMIN_EMAILS.includes(user.email || ''));
      setIsLoading(false);
      if (!user && pathname !== "/") {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-screen">
            <Skeleton className="h-24 w-24 rounded-full" />
        </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
