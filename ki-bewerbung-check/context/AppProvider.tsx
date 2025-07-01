import { createContext, useState } from 'react';

export type AppContextType = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppProvider = ({ children }: any) => {

    const [score, setScore] = useState<number>(100);

    return (
        <AppContext.Provider value={{ score, setScore }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider; 