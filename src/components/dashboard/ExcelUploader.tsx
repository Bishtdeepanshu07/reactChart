import { useCallback } from 'react';
import { Upload, FileSpreadsheet, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useExcelData } from '@/contexts/ExcelContext';
import { ComplianceRow } from '@/types/compliance';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';

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
          Month: row['Month'] || '',
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
          DueDate: row['Due Date'] || '',
          DateOfTaskCompletion: row['Date of Task Completion'] || '',
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
          ValidityFrom: row['Validity From'] || '',
          ValidityTo: row['Validity To'] || '',
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
