import { useState } from 'react';
import { FileSpreadsheet, Loader2, FolderOpen } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';
import { useExcelData } from '@/contexts/ExcelContext';
import { ComplianceRow, RegistrationRow } from '@/types/compliance';
import { toast } from 'sonner';

interface UploadBatch {
  key: string;
  timestamp: string;
  companyCount: number;
  ids: string[];
  fileName: string;
}

const PreviousDataButton = () => {
  const { setData, setRegistrationData, setFileName } = useExcelData();
  const [open, setOpen] = useState(false);
  const [batches, setBatches] = useState<UploadBatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const { data, error } = await (supabase as any)
        .from('company_data')
        .select('id, company_name, updated_at, file_name')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Group records by upload timestamp (rounded to minute) to identify upload batches
      const groups = new Map<string, { ids: string[]; companies: Set<string>; timestamp: string; fileName: string }>();
      (data || []).forEach((row: any) => {
        const d = new Date(row.updated_at);
        const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getHours()}-${d.getMinutes()}`;
        if (!groups.has(key)) {
          groups.set(key, { ids: [], companies: new Set(), timestamp: row.updated_at, fileName: row.file_name || '' });
        }
        const g = groups.get(key)!;
        g.ids.push(row.id);
        g.companies.add(row.company_name);
        if (!g.fileName && row.file_name) g.fileName = row.file_name;
      });

      const batchList: UploadBatch[] = Array.from(groups.entries()).map(([key, g]) => ({
        key,
        timestamp: g.timestamp,
        companyCount: g.companies.size,
        ids: g.ids,
        fileName: g.fileName,
      }));

      setBatches(batchList);
    } catch (err) {
      console.error('Failed to fetch previous data:', err);
      toast.error('Failed to load previous uploads');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (batch: UploadBatch) => {
    setLoadingKey(batch.key);
    try {
      const { data, error } = await (supabase as any)
        .from('company_data')
        .select('compliance_data, registration_data')
        .in('id', batch.ids);

      if (error) throw error;

      const allCompliance: ComplianceRow[] = [];
      const allRegistration: RegistrationRow[] = [];

      (data || []).forEach((row: any) => {
        if (Array.isArray(row.compliance_data)) allCompliance.push(...row.compliance_data);
        if (Array.isArray(row.registration_data)) allRegistration.push(...row.registration_data);
      });

      setData(allCompliance);
      setRegistrationData(allRegistration);
      setFileName(batch.fileName || `Upload_${formatDate(batch.timestamp)}.xlsx`);
      setOpen(false);
      toast.success(`Loaded ${allCompliance.length + allRegistration.length} records from previous upload`);
    } catch (err) {
      console.error('Failed to load upload:', err);
      toast.error('Failed to load upload');
    } finally {
      setLoadingKey(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Popover open={open} onOpenChange={(o) => { setOpen(o); if (o) fetchBatches(); }}>
      <PopoverTrigger asChild>
        <button className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 bg-secondary text-secondary-foreground hover:bg-secondary/80">
          <FolderOpen className="h-3.5 w-3.5" />
          Previous Data
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-2.5 border-b border-border">
          <p className="text-sm font-medium text-foreground">Previously Uploaded Excel Files</p>
        </div>
        {loading ? (
          <div className="flex items-center justify-center p-6">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : batches.length > 0 ? (
          <div className="max-h-64 overflow-y-auto p-1">
            {batches.map((batch) => (
              <button
                key={batch.key}
                onClick={() => handleSelect(batch)}
                disabled={loadingKey === batch.key}
                className="w-full text-left px-3 py-2.5 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors flex items-center gap-3 disabled:opacity-50"
              >
                <FileSpreadsheet className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{batch.fileName || `Upload — ${batch.companyCount} ${batch.companyCount === 1 ? 'company' : 'companies'}`}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(batch.timestamp)} • {batch.companyCount} {batch.companyCount === 1 ? 'company' : 'companies'}</p>
                </div>
                {loadingKey === batch.key && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground flex-shrink-0" />}
              </button>
            ))}
          </div>
        ) : (
          <div className="p-6 text-sm text-muted-foreground text-center">No previously uploaded files</div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default PreviousDataButton;
