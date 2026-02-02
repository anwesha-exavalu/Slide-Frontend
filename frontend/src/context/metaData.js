import React, { createContext, useContext, useState } from 'react'

const defaultTheme = localStorage.getItem('theme') || 'light';

const contextDefaultValues = {
    custmerDetails: {},
    setCustmerDetails: (data) => data,
    theme: defaultTheme,
    setTheme: (data) => data    
}

const MetaDataContext = createContext(contextDefaultValues)

export const MetaDataProvider = ({ children }) => {
    const [custmerDetails, setCustmerDetails] = useState(contextDefaultValues.custmerDetails);
    const [theme, setTheme] = useState(contextDefaultValues.theme)

    return (
        <MetaDataContext.Provider
            value={{
                custmerDetails,
                setCustmerDetails,
                theme,
                setTheme
            }}
        >
            {children}
        </MetaDataContext.Provider>
    )
}

export default () => useContext(MetaDataContext)
