import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoadingScreen from '../../components/common/LoadingScreen';

interface PinEntryScreenProps {
  onAuthenticated: (targetPath?: string) => void;
}

const PinEntryScreen = ({ onAuthenticated }: PinEntryScreenProps) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([
    'Interactive Brokers Security Terminal v2.1.0',
    'Copyright (c) 2025 Interactive Brokers LLC',
    'All rights reserved.',
    '',
    'System initialized...',
    'Security protocols active...',
    'Awaiting authentication...',
    ''
  ]);
  
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Add blinking cursor effect
    const cursor = setInterval(() => {
      if (inputRef.current) {
        inputRef.current.style.borderRight = inputRef.current.style.borderRight === '2px solid #000' ? 'none' : '2px solid #000';
      }
    }, 500);
    
    return () => clearInterval(cursor);
  }, []);
  
  useEffect(() => {
    // Auto-scroll to bottom when command history updates
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);
  
  const addToHistory = (text: string) => {
    setCommandHistory(prev => [...prev, text]);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      addToHistory('> ' + input);
      addToHistory('ERROR: Access temporarily blocked. Please wait...');
      setInput('');
      return;
    }
    
    addToHistory('> ' + input);
    
    if (input.trim() === 'crisdoraodxb') {
      addToHistory('Authentication successful...');
      addToHistory('Initializing secure session...');
      addToHistory('Redirecting to admin login...');
      
      // Store PIN authentication in sessionStorage
      sessionStorage.setItem('pin_authenticated', 'true');
      
      setIsLoading(true);
      
      // Show loading screen for 2 seconds then navigate to admin login
      setTimeout(() => {
        onAuthenticated('/login');
      }, 2000);
    } else if (input.trim() === 'allow-affiliate') {
      addToHistory('Authentication successful...');
      addToHistory('Initializing secure session...');
      addToHistory('Redirecting to affiliate login...');
      
      // Store PIN authentication in sessionStorage
      sessionStorage.setItem('pin_authenticated', 'true');
      sessionStorage.setItem('login_redirect_path', '/affiliate-login');
      
      setIsLoading(true);
      
      // Show loading screen for 2 seconds then navigate to affiliate login
      setTimeout(() => {
        window.location.href = '/affiliate-login';
      }, 2000);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      addToHistory('ERROR: Invalid authentication code');
      addToHistory(`Failed attempts: ${newAttempts}/3`);
      
      if (newAttempts >= 3) {
        addToHistory('WARNING: Maximum attempts exceeded');
        addToHistory('Access temporarily blocked for security');
        setIsBlocked(true);
        
        // Unblock after 30 seconds
        setTimeout(() => {
          setIsBlocked(false);
          setAttempts(0);
          addToHistory('');
          addToHistory('Security timeout expired. Access restored.');
          addToHistory('Enter authentication code:');
        }, 30000);
      } else {
        addToHistory('Enter authentication code:');
      }
    }
    
    setInput('');
  };
  
  if (isLoading) {
    return <LoadingScreen message="Initializing secure session..." />;
  }
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Interactive Brokers Header */}
        <div className="text-center mb-8">
          <img 
            src="/Screenshot 2025-06-07 024813.png" 
            alt="Interactive Brokers" 
            className="h-12 w-auto object-contain mx-auto mb-4"
          />
          <div className="w-full h-1 bg-black mb-8"></div>
        </div>
        
        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border-2 border-black shadow-lg"
        >
          {/* Terminal Header */}
          <div className="bg-black text-white px-4 py-2 flex items-center justify-between">
            <span className="font-mono text-sm font-bold">INTERACTIVE BROKERS SECURITY TERMINAL</span>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-white"></div>
              <div className="w-3 h-3 bg-white"></div>
              <div className="w-3 h-3 bg-white"></div>
            </div>
          </div>
          
          {/* Terminal Content */}
          <div className="p-6">
            <div 
              ref={terminalRef}
              className="bg-white border border-black p-4 h-96 overflow-y-auto font-mono text-sm"
            >
              {commandHistory.map((line, index) => (
                <div key={index} className="text-black whitespace-pre-wrap">
                  {line}
                </div>
              ))}
              
              {/* Current Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center mt-2">
                <span className="text-black mr-2">&gt;</span>
                <input
                  ref={inputRef}
                  type="password"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-black font-mono caret-black"
                  placeholder={isBlocked ? 'ACCESS BLOCKED...' : 'Enter authentication code'}
                  title="Enter 'crisdoraodxb' for admin access or 'allow-affiliate' for affiliate access"
                  disabled={isBlocked}
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>
            
            {/* Terminal Footer */}
            <div className="mt-4 text-center">
              <p className="font-mono text-xs text-black">
                SECURE AUTHENTICATION REQUIRED | ADMIN: crisdoraodxb | AFFILIATE: allow-affiliate
              </p>
              {isBlocked && (
                <p className="font-mono text-xs text-black mt-2">
                  SECURITY LOCKOUT ACTIVE - PLEASE WAIT 30 SECONDS
                </p>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Footer */}
        <div className="text-center mt-8">
          <p className="font-mono text-xs text-black">
            Interactive Brokers LLC | Regulated by SEC, FINRA, CFTC
          </p>
        </div>
      </div>
    </div>
  );
};

export default PinEntryScreen;