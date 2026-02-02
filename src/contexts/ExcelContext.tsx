import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ComplianceRow, ExcelContextType } from '@/types/compliance';

const ExcelContext = createContext<ExcelContextType | undefined>(undefined);

export const ExcelProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ComplianceRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  return (
    <ExcelContext.Provider value={{ data, setData, isLoading, setIsLoading, fileName, setFileName }}>
      {children}
    </ExcelContext.Provider>
  );
};

export const useExcelData = () => {
  const context = useContext(ExcelContext);
  if (context === undefined) {
    throw new Error('useExcelData must be used within an ExcelProvider');
  }
  return context;
};
