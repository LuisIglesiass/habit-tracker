import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface Habit {
    id: number;
    name: string;
    completed: boolean;
}

interface HabitsContextProps {
    habits: Habit[];
    completedHabits: Habit[];
    incompleteHabits: Habit[];
    addHabit: (name: string) => void;
    removeHabit: (id: number) => void;
    editHabit: (id: number, name: string) => void;
    setCompletedHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
    setIncompleteHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

export const HabitsContext = createContext<HabitsContextProps | undefined>(undefined);

export const HabitsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [habits, setHabits] = useState<Habit[]>(() => {
        const savedHabits = localStorage.getItem('habits');
        return savedHabits ? JSON.parse(savedHabits) : [];
    });
    const [completedHabits, setCompletedHabits] = useState<Habit[]>(() => {
        const savedCompletedHabits = localStorage.getItem('completedHabits');
        return savedCompletedHabits ? JSON.parse(savedCompletedHabits) : [];
    });
    const [incompleteHabits, setIncompleteHabits] = useState<Habit[]>(() => {
        const savedIncompleteHabits = localStorage.getItem('incompleteHabits');
        return savedIncompleteHabits ? JSON.parse(savedIncompleteHabits) : [];
    });

    useEffect(() => {
        localStorage.setItem('habits', JSON.stringify(habits));
    }, [habits]);

    useEffect(() => {
        localStorage.setItem('completedHabits', JSON.stringify(completedHabits));
    }, [completedHabits]);

    useEffect(() => {
        localStorage.setItem('incompleteHabits', JSON.stringify(incompleteHabits));
    }, [incompleteHabits]);

    useEffect(() => {
        const completed = habits.filter(habit => habit.completed);
        setCompletedHabits(completed);
        setIncompleteHabits(habits.filter(habit => !habit.completed));
    }, [habits]);

    const addHabit = (name: string) => {
        const newHabit = { id: habits.length + 1, name, completed: false };
        setHabits([...habits, newHabit]);
    };

    const removeHabit = (id: number) => {
        const index = habits.findIndex((habit) => habit.id === id);
    
        if (index !== -1) {
          const newHabits = [...habits]; // Copia del array
          newHabits.splice(index, 1); // Elimina el objeto
    
          setHabits(newHabits); // Actualiza el estado
        }
      };

      const editHabit = (id: number, name: string) => {
        const index = habits.findIndex((habit) => habit.id === id);

        if (index !== -1) {
            const newHabits = [...habits];
            newHabits[index].name = name;

            setHabits(newHabits);
        }
    };

    return (
        <HabitsContext.Provider value={{ habits, completedHabits, incompleteHabits, addHabit, removeHabit, editHabit, setCompletedHabits, setIncompleteHabits }}>
            {children}
        </HabitsContext.Provider>
    );
};