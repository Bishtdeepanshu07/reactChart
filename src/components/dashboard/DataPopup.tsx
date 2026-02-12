import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DataPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  columns: { key: string; label: string }[];
  data: Record<string, any>[];
}

const DataPopup = ({ open, onOpenChange, title, columns, data }: DataPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{title} ({data.length} records)</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {data.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No records found.</p>
          ) : (
            <div className="overflow-x-auto">
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
                        <td key={col.key}>{row[col.key] ?? '-'}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DataPopup;
