import { useCallback } from 'react';
import { Upload, FileSpreadsheet, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useExcelData } from '@/contexts/ExcelContext';
import { ComplianceRow } from '@/types/compliance';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';
import { format, parse, isValid } from 'date-fns';

// Parse Excel dates - handles serial numbers and various string formats
const parseExcelDate = (value: any): string => {
  if (!value) return '';

  // Handle Excel serial dates (numbers between 1 and 100000 are likely dates)
  if (typeof value === 'number' && value > 1 && value < 100000) {
    const excelEpoch = new Date(1899, 11, 30); // December 30, 1899
    const date = new Date(excelEpoch.getTime() + value * 86400000);
    return format(date, 'dd/MM/yyyy');
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return '';

    // Try multiple formats
    const formats = ['dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd', 'dd-MM-yyyy', 'dd/MM/yy'];
    for (const fmt of formats) {
      const parsed = parse(trimmed, fmt, new Date());
      if (isValid(parsed)) {
        return format(parsed, 'dd/MM/yyyy');
      }
    }
    // Return original if no format matched
    return trimmed;
  }

  if (value instanceof Date && isValid(value)) {
    return format(value, 'dd/MM/yyyy');
  }

  return String(value);
};

// Parse Excel month field - handles serial numbers and "MMM-yy" format
const parseExcelMonth = (value: any): string => {
  if (!value) return '';

  // Handle Excel serial dates for month
  if (typeof value === 'number' && value > 1 && value < 100000) {
    const excelEpoch = new Date(1899, 11, 30);
    const date = new Date(excelEpoch.getTime() + value * 86400000);
    return format(date, 'MMM-yy'); // Returns "Jan-25" format
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return trimmed;

    // Try parsing "MMM-yy" format (e.g., "Jan-25")
    const monthFormats = ['MMM-yy', 'MMM-yyyy', 'MMMM-yy', 'MMMM-yyyy'];
    for (const fmt of monthFormats) {
      const parsed = parse(trimmed, fmt, new Date());
      if (isValid(parsed)) {
        return format(parsed, 'MMM-yy');
      }
    }
    return trimmed;
  }

  if (value instanceof Date && isValid(value)) {
    return format(value, 'MMM-yy');
  }

  return String(value);
};

const ExcelUploader = () => {
  const { setData, setIsLoading, fileName, setFileName, data } = useExcelData();

  const parseExcel = useCallback((file: File) => {
    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Map Excel columns to our interface
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
        setFileName(file.name);
        toast.success(`Loaded ${mappedData.length} records from ${file.name}`);
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        toast.error('Failed to parse Excel file. Please check the format.');
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setIsLoading(false);
      toast.error('Failed to read file');
    };

    reader.readAsArrayBuffer(file);
  }, [setData, setFileName, setIsLoading]);

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
    setFileName('');
  };

  return (
    <div className="flex items-center gap-3">
      {fileName ? (
        <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-md">
          <FileSpreadsheet className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground">{fileName}</span>
          <span className="text-xs text-muted-foreground">({data.length} records)</span>
          <button
            onClick={handleClear}
            className="ml-2 p-1 hover:bg-muted rounded transition-colors"
          >
            <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      ) : (
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button variant="outline" size="sm" asChild>
            <span className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Excel
            </span>
          </Button>
        </label>
      )}
    </div>
  );
};

export default ExcelUploader;
