import { createContext, useState } from 'react';

export type AppContextType = {
  score: number;
  fileAdded: boolean;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setFileAdded: React.Dispatch<React.SetStateAction<boolean>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppProvider = ({ children }: any) => {

    const [score, setScore] = useState<number>(100);
    const [fileAdded, setFileAdded] = useState<boolean>(false);

    return (
        <AppContext.Provider value={{ score, setScore, fileAdded, setFileAdded }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider; 