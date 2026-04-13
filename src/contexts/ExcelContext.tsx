import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { ComplianceRow, RegistrationRow, ExcelContextType } from '@/types/compliance';

const ExcelContext = createContext<ExcelContextType | undefined>(undefined);

export const ExcelProvider = ({ children }: { children: ReactNode }) => {
  const [rawData, setRawData] = useState<ComplianceRow[]>([]);
  const [rawRegistrationData, setRawRegistrationData] = useState<RegistrationRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedActs, setSelectedActs] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState('');

  const data = useMemo(() => {
    if (!selectedCompany.trim()) return rawData;
    const search = selectedCompany.toLowerCase().trim();
    return rawData.filter(row => row.CompanyName?.toLowerCase().includes(search));
  }, [rawData, selectedCompany]);

  const registrationData = useMemo(() => {
    if (!selectedCompany.trim()) return rawRegistrationData;
    const search = selectedCompany.toLowerCase().trim();
    return rawRegistrationData.filter(row => row.CompanyName?.toLowerCase().includes(search));
  }, [rawRegistrationData, selectedCompany]);

  const companyNames = useMemo(() => {
    const names = new Set<string>();
    rawData.forEach(row => { if (row.CompanyName) names.add(row.CompanyName); });
    rawRegistrationData.forEach(row => { if (row.CompanyName) names.add(row.CompanyName); });
    return Array.from(names).sort();
  }, [rawData, rawRegistrationData]);

  return (
    <ExcelContext.Provider value={{ data, setData: setRawData, registrationData, setRegistrationData: setRawRegistrationData, isLoading, setIsLoading, fileName, setFileName, selectedMonths, setSelectedMonths, selectedActs, setSelectedActs, selectedActivities, setSelectedActivities, selectedLocations, setSelectedLocations, selectedCompany, setSelectedCompany, companyNames }}>
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
