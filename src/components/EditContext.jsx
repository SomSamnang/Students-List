import { createContext, useState } from 'react';

export const EditContext = createContext();
// eslint-disable-next-line react/prop-types
export const EditProvider = ({ children }) => {
    const [editItem, setEditItem] = useState();
    
    return (
        <EditContext.Provider value={{ editItem, setEditItem }}>
            {children}
        </EditContext.Provider>
    );
};