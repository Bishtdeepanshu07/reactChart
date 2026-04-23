import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import ExcelJS from 'exceljs';

interface DataPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  columns: { key: string; label: string }[];
  data: Record<string, any>[];
}

const DataPopup = ({ open, onOpenChange, title, columns, data }: DataPopupProps) => {
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Add header row
    worksheet.columns = columns.map(col => ({
      header: col.label,
      key: col.key,
      width: 20,
    }));

    // Add data rows
    data.forEach(row => {
      const rowData: Record<string, any> = {};
      columns.forEach(col => {
        rowData[col.key] = row[col.key] ?? '';
      });
      worksheet.addRow(rowData);
    });

    // Generate and download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
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
                      <th
                        key={col.key}
                        className={col.key === 'ComplianceScore' ? 'whitespace-nowrap text-center' : 'whitespace-nowrap'}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, i) => (
                    <tr key={i}>
                      {columns.map(col => (
                        <td
                          key={col.key}
                          className={col.key === 'ComplianceScore' ? 'whitespace-nowrap text-center' : 'whitespace-nowrap'}
                        >
                          {row[col.key] instanceof Date ? row[col.key].toLocaleDateString() : (row[col.key] ?? '-')}
                        </td>
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
