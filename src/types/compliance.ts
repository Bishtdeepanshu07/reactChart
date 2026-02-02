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

export interface ExcelContextType {
  data: ComplianceRow[];
  setData: (data: ComplianceRow[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  fileName: string;
  setFileName: (name: string) => void;
}
