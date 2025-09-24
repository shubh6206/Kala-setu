'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoginDialog } from '@/components/auth/LoginDialog';
import { SignupDialog } from '@/components/auth/SignupDialog';
import { UserMenu } from '@/components/auth/UserMenu';
import { useAuth } from '@/contexts/AuthContext';

export function AuthButtons() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { user } = useAuth();

  const handleSwitchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <>
      {user ? (
        <UserMenu />
      ) : (
        <>
          <Button 
            variant="ghost"
            onClick={() => setShowLogin(true)}
          >
            Login
          </Button>
          <Button onClick={() => setShowSignup(true)}>
            Sign Up
          </Button>
        </>
      )}
      
      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
        onSwitchToSignup={handleSwitchToSignup}
      />
      <SignupDialog
        open={showSignup}
        onOpenChange={setShowSignup}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
}