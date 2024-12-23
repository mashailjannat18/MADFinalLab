import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

// Define the Buyer type based on the database schema
type Buyer = {
  id: number;
  email?: string;
  phone?: string;
  password: string;
};

type User = {
  id: number;
  email?: string;
  phone?: string;
};

type UserContextType = {
  user: User | null;
  signUp: (identifier: string, password: string) => Promise<string | null>;
  login: (identifier: string, password: string) => Promise<string | null>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Handle sign-up
  const signUp = async (identifier: string, password: string): Promise<string | null> => {
    const isEmail = identifier.includes('@'); // Check if identifier is an email

    try {
      const { data: existingUser, error: fetchError } = await supabase
        .from('Buyer')
        .select('id')
        .or(`email.eq.${identifier},phone.eq.${identifier}`);

      if (fetchError) {
        return 'An error occurred while checking existing users.';
      }

      if (existingUser && existingUser.length > 0) {
        return 'Email or phone already exists.';
      }

      const { data, error } = await supabase
        .from('Buyer')
        .insert([
          isEmail
            ? { email: identifier, password }
            : { phone: identifier, password },
        ])
        .select();

      if (error) {
        return 'An error occurred while creating the account.';
      }

      if (data && data.length > 0) {
        const newUser = data[0];
        setUser({ id: newUser.id, email: newUser.email, phone: newUser.phone });
        return null; 
      }
    } catch (err) {
      return 'Unexpected error occurred during registration.';
    }

    return 'Unable to register the user.';
  };

  const login = async (identifier: string, password: string): Promise<string | null> => {
    try {
      const { data, error } = await supabase
        .from('Buyer')
        .select('id, email, phone')
        .or(`email.eq.${identifier},phone.eq.${identifier}`)
        .eq('password', password);

      if (error) {
        return 'An error occurred during login.';
      }

      if (data && data.length > 0) {
        const loggedInUser = data[0];
        setUser({ id: loggedInUser.id, email: loggedInUser.email, phone: loggedInUser.phone });
        return null;
      } else {
        return 'Invalid email/phone or password.';
      }
    } catch (err) {
      return 'Unexpected error occurred during login.';
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, signUp, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
