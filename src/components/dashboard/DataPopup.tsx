import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface DataPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  columns: { key: string; label: string }[];
  data: Record<string, any>[];
}

const DataPopup = ({ open, onOpenChange, title, columns, data }: DataPopupProps) => {
  const handleExport = () => {
    const exportData = data.map(row =>
      Object.fromEntries(columns.map(col => [col.label, row[col.key] ?? '']))
    );
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, `${title.replace(/[^a-zA-Z0-9]/g, '_')}.xlsx`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4 pr-8">
            <DialogTitle>{title} ({data.length} records)</DialogTitle>
            {data.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleExport} className="shrink-0">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            )}
          </div>
        </DialogHeader>
        {data.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No records found.</p>
        ) : (
          <ScrollArea className="h-[60vh]">
            <div className="min-w-max">
              <table className="data-table w-full text-sm">
                <thead className="sticky top-0 z-10 bg-card">
                  <tr>
                    {columns.map(col => (
                      <th key={col.key} className="whitespace-nowrap">{col.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i}>
                      {columns.map(col => (
                        <td key={col.key} className="whitespace-nowrap">{row[col.key] ?? '-'}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DataPopup;
