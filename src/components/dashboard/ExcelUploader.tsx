import { useCallback } from 'react';
import { Upload, FileSpreadsheet, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useExcelData } from '@/contexts/ExcelContext';
import { ComplianceRow, RegistrationRow } from '@/types/compliance';
import ExcelJS from 'exceljs';
import { toast } from 'sonner';
import { format, parse, isValid } from 'date-fns';

// Parse Excel dates - handles serial numbers and various string formats
const parseExcelDate = (value: any): string => {
  if (!value) return '';

  if (value instanceof Date && isValid(value)) {
    return format(value, 'dd/MM/yyyy');
  }

  // Handle Excel serial dates (numbers between 1 and 100000 are likely dates)
  if (typeof value === 'number' && value > 1 && value < 100000) {
    const excelEpoch = new Date(1899, 11, 30); // December 30, 1899
    const date = new Date(excelEpoch.getTime() + value * 86400000);
    return format(date, 'dd/MM/yyyy');
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return '';

    const formats = ['dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd', 'dd-MM-yyyy', 'dd/MM/yy'];
    for (const fmt of formats) {
      const parsed = parse(trimmed, fmt, new Date());
      if (isValid(parsed)) {
        return format(parsed, 'dd/MM/yyyy');
      }
    }
    return trimmed;
  }

  return String(value);
};

// Parse Excel month field - handles serial numbers and "MMM-yy" format
const parseExcelMonth = (value: any): string => {
  if (!value) return '';

  if (value instanceof Date && isValid(value)) {
    return format(value, 'MMM-yy');
  }

  if (typeof value === 'number' && value > 1 && value < 100000) {
    const excelEpoch = new Date(1899, 11, 30);
    const date = new Date(excelEpoch.getTime() + value * 86400000);
    return format(date, 'MMM-yy');
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return trimmed;

    const monthFormats = ['MMM-yy', 'MMM-yyyy', 'MMMM-yy', 'MMMM-yyyy'];
    for (const fmt of monthFormats) {
      const parsed = parse(trimmed, fmt, new Date());
      if (isValid(parsed)) {
        return format(parsed, 'MMM-yy');
      }
    }
    return trimmed;
  }

  return String(value);
};

// Helper: normalize Excel headers so accidental leading/trailing spaces don't break mapping
const normalizeExcelHeader = (value: unknown): string =>
  String(value ?? '')
    .replace(/\u00A0/g, ' ')
    .trim();

// Helper: convert exceljs worksheet to array of objects (like XLSX.utils.sheet_to_json)
const sheetToJson = (worksheet: ExcelJS.Worksheet): Record<string, any>[] => {
  const rows: Record<string, any>[] = [];
  const headerRow = worksheet.getRow(1);
  const colCount = worksheet.columnCount;
  const headers: string[] = [];

  for (let col = 1; col <= colCount; col++) {
    headers[col] = normalizeExcelHeader(headerRow.getCell(col).value);
  }

  const rowCount = worksheet.rowCount;
  for (let rowNum = 2; rowNum <= rowCount; rowNum++) {
    const row = worksheet.getRow(rowNum);
    const obj: Record<string, any> = {};
    for (let col = 1; col <= colCount; col++) {
      const header = headers[col];
      if (header) {
        obj[header] = row.getCell(col).value;
      }
    }
    if (Object.keys(obj).length > 0) {
      rows.push(obj);
    }
  }

  return rows;
};

const ExcelUploader = () => {
  const { setData, setRegistrationData, setIsLoading, fileName, setFileName, data } = useExcelData();

  const parseExcel = useCallback(async (file: File) => {
    setIsLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);

      // Parse first sheet (Compliance data)
      const worksheet1 = workbook.worksheets[0];
      if (!worksheet1) throw new Error('No sheets found');

      const jsonData = sheetToJson(worksheet1);

      const mappedData: ComplianceRow[] = jsonData.map((row: any) => ({
        Month: parseExcelMonth(row['Month']),
        Qtr: row['Qtr'] || '',
        Year: row['Year'] || '',
        CompanyName: row['Company Name'] || '',
        Location: row['Location'] || '',
        ActName: row['Act Name'] || '',
        Vertical: row['Vertical'] || '',
        ActivitiesName: row['Activities Name'] || '',
        ActivityCount: Number(row['Activity count']) || 0,
        Zone: row['Zone'] || '',
        State: row['State'] || '',
        TaskCycle: row['Task Cycle'] || '',
        DueDate: parseExcelDate(row['Due Date']),
        DateOfTaskCompletion: parseExcelDate(row['Date of Task Completion']),
        ComplianceScore: Number(row['Compliance Score']) || 0,
        Completed: Number(row['Completed']) || 0,
        Pending: Number(row['Pending']) || 0,
        NotDue: Number(row['Not Due']) || 0,
        ComplianceStatus: row['Compliance Status'] || '',
        PendingCategory: row['Pending Category'] || '',
        Risk: row['Risk'] || '',
        Comment: row['Comment'] || '',
        SpocPerson: row['Spoc Person'] || '',
        SpocEmail: row['Spoc Email'] || '',
        ClientSpocPerson: row['Client Spoc Person'] || '',
        CertificateNumber: row['Certificate Number'] || '',
        CertificateStatus: row['Certificate Status'] || '',
        ValidityFrom: parseExcelDate(row['Validity From']),
        ValidityTo: parseExcelDate(row['Validity To']),
        DueIn: row['Due in'] || '',
      }));

      setData(mappedData);

      // Parse second sheet (Registration data) if exists
      if (workbook.worksheets.length >= 2) {
        const worksheet2 = workbook.worksheets[1];
        const jsonData2 = sheetToJson(worksheet2);
        console.log('Sheet2 raw headers:', Object.keys(jsonData2[0] || {}));
        console.log('Sheet2 first row:', JSON.stringify(jsonData2[0]));

        const mappedRegistrationData: RegistrationRow[] = jsonData2.map((row: any) => ({
          CompanyName: row['Company Name'] || '',
          State: row['State'] || '',
          City: row['City'] || '',
          Address: row['Address'] || '',
          EmployerName: row['Employer Name'] || '',
          Type: row['Type'] || '',
          HeadcountSalary: Number(row['Headcount as per Salary']) || 0,
          HeadcountRC: Number(row['Headcount as per RC']) || 0,
          RCNo: row['RC No.'] || '',
          DateOfObtained: parseExcelDate(row['Date Of Obtained']),
          Validity: row['Validity'] || '',
          Status: row['Status'] || '',
          Completed: Number(row['Completed']) || 0,
          FreshRequired: Number(row['Fresh Required']) || 0,
          Exemption: Number(row['Exemption']) || 0,
          Count: Number(row['Count']) || 0,
          RenewalStatus: row['Renewal Status'] || '',
          AmendmentStatus: row['Amendment status'] || '',
          Days: row['days'] || '',
        }));

        setRegistrationData(mappedRegistrationData);
      }

      setFileName(file.name);
      toast.success(`Loaded ${mappedData.length} records from ${file.name}`);
    } catch (error) {
      console.error('Error parsing Excel file:', error);
      toast.error('Failed to parse Excel file. Please check the format.');
    } finally {
      setIsLoading(false);
    }
  }, [setData, setRegistrationData, setFileName, setIsLoading]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.match(/\.(xlsx|xls)$/)) {
        toast.error('Please upload an Excel file (.xlsx or .xls)');
        return;
      }
      parseExcel(file);
    }
  };

  const handleClear = () => {
    setData([]);
    setRegistrationData([]);
    setFileName('');
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
      {fileName ? (
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-secondary rounded-md text-xs sm:text-sm w-full sm:w-auto min-w-0">
          <FileSpreadsheet className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-foreground truncate">{fileName}</span>
          <span className="text-xs text-muted-foreground flex-shrink-0">({data.length})</span>
          <button
            onClick={handleClear}
            className="ml-1 sm:ml-2 p-1 hover:bg-muted rounded transition-colors flex-shrink-0"
          >
            <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      ) : (
        <label className="cursor-pointer w-full sm:w-auto">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
            <span className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 text-xs sm:text-sm">
              <Upload className="w-4 h-4 flex-shrink-0" />
              <span>Upload Excel</span>
            </span>
          </Button>
        </label>
      )}
    </div>
  );
};

export default ExcelUploader;
