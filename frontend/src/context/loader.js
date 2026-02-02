import React, { createContext, useContext, useState } from 'react'

const contextDefaultValues = {
  loader: true,
  setLoader: (data) => data,
}

const LoaderContext = createContext(contextDefaultValues)

export const LoaderProvider = ({ children }) => {
  const [loader, setLoader] = useState(contextDefaultValues.loader)

  return (
    <LoaderContext.Provider
      value={{
        loader,
        setLoader,
      }}
    >
      {children}
    </LoaderContext.Provider>
  )
}

export default () => useContext(LoaderContext)
