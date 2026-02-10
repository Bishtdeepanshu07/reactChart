export interface ComplianceRow {
  Month: string;
  Qtr: string;
  Year: string | number;
  CompanyName: string;
  Location: string;
  ActName: string;
  Vertical: string;
  ActivitiesName: string;
  ActivityCount: number;
  Zone: string;
  State: string;
  TaskCycle: string;
  DueDate: string;
  DateOfTaskCompletion: string;
  ComplianceScore: number;
  Completed: number;
  Pending: number;
  NotDue: number;
  ComplianceStatus: string;
  PendingCategory: string;
  Risk: string;
  Comment: string;
  SpocPerson: string;
  SpocEmail: string;
  ClientSpocPerson: string;
  CertificateNumber: string;
  CertificateStatus: string;
  ValidityFrom: string;
  ValidityTo: string;
  DueIn: string;
}

export interface RegistrationRow {
  CompanyName: string;
  State: string;
  City: string;
  Address: string;
  EmployerName: string;
  Type: string;
  HeadcountSalary: number;
  HeadcountRC: number;
  RCNo: string;
  DateOfObtained: string;
  Validity: string;
  Status: string;
  Completed: number;
  FreshRequired: number;
  Exemption: number;
  Count: number;
  RenewalStatus: string;
  AmendmentStatus: string;
  Days: string;
}

export interface ExcelContextType {
  data: ComplianceRow[];
  setData: (data: ComplianceRow[]) => void;
  registrationData: RegistrationRow[];
  setRegistrationData: (data: RegistrationRow[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  fileName: string;
  setFileName: (name: string) => void;
  selectedMonths: string[];
  setSelectedMonths: React.Dispatch<React.SetStateAction<string[]>>;
  selectedActs: string[];
  setSelectedActs: React.Dispatch<React.SetStateAction<string[]>>;
  selectedActivities: string[];
  setSelectedActivities: React.Dispatch<React.SetStateAction<string[]>>;
  selectedLocations: string[];
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
}
