
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Reminder {
  id: string;
  message: string;
  time: string; // ISO string format
  isRecurring: boolean;
  recurringPattern?: 'daily' | 'weekly' | 'monthly';
  isPremium: boolean;
}

interface ReminderContextType {
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  deleteReminder: (id: string) => void;
  updateReminder: (id: string, reminder: Partial<Reminder>) => void;
  isPremiumUser: boolean;
  setPremiumUser: (isPremium: boolean) => void;
}

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export const useReminders = () => {
  const context = useContext(ReminderContext);
  if (!context) {
    throw new Error('useReminders must be used within a ReminderProvider');
  }
  return context;
};

export const ReminderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isPremiumUser, setPremiumUser] = useState<boolean>(false);

  // Load reminders from localStorage on initial load
  useEffect(() => {
    const storedReminders = localStorage.getItem('reminders');
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
    }
    
    // Check if user is premium
    const premiumStatus = localStorage.getItem('isPremiumUser') === 'true';
    setPremiumUser(premiumStatus);
  }, []);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Save premium status to localStorage
  useEffect(() => {
    localStorage.setItem('isPremiumUser', String(isPremiumUser));
  }, [isPremiumUser]);

  // Check for due reminders every minute
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date().getTime();
      
      reminders.forEach(reminder => {
        const reminderTime = new Date(reminder.time).getTime();
        
        // If reminder is due (within the last minute)
        if (reminderTime <= now && reminderTime > now - 60000) {
          // Show notification if browser supports it
          if ('Notification' in window) {
            if (Notification.permission === 'granted') {
              new Notification('Swift Ride Rescue Reminder', {
                body: reminder.message,
                icon: '/favicon.ico'
              });
              
              // Play sound
              const audio = new Audio('/reminder-sound.mp3');
              audio.play().catch(err => console.error('Failed to play sound', err));
            } else if (Notification.permission !== 'denied') {
              Notification.requestPermission();
            }
          }
          
          // Handle recurring reminders
          if (reminder.isRecurring && reminder.recurringPattern) {
            const nextReminder = { ...reminder };
            
            switch (reminder.recurringPattern) {
              case 'daily':
                nextReminder.time = new Date(reminderTime + 24 * 60 * 60 * 1000).toISOString();
                break;
              case 'weekly':
                nextReminder.time = new Date(reminderTime + 7 * 24 * 60 * 60 * 1000).toISOString();
                break;
              case 'monthly': {
                const date = new Date(reminderTime);
                date.setMonth(date.getMonth() + 1);
                nextReminder.time = date.toISOString();
                break;
              }
            }
            
            // Update the reminder with the new time
            updateReminder(reminder.id, { time: nextReminder.time });
          }
        }
      });
    };

    // Check every 10 seconds (in a real app, you might want to optimize this)
    const interval = setInterval(checkReminders, 10000);
    return () => clearInterval(interval);
  }, [reminders]);

  // Add a new reminder
  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    const newReminder = {
      ...reminder,
      id: Math.random().toString(36).substring(2, 11)
    };
    
    setReminders(prev => [...prev, newReminder]);
  };

  // Delete a reminder
  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  // Update a reminder
  const updateReminder = (id: string, reminderData: Partial<Reminder>) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, ...reminderData } : reminder
    ));
  };

  return (
    <ReminderContext.Provider value={{
      reminders,
      addReminder,
      deleteReminder,
      updateReminder,
      isPremiumUser,
      setPremiumUser
    }}>
      {children}
    </ReminderContext.Provider>
  );
};
