import React from 'react'; 
  
const ServiceContext =React.createContext(); 
  
export const Provider = ServiceContext.Provider; 
export const Consumer = ServiceContext.Consumer;