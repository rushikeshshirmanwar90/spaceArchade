'use client';

import { useEditContext } from '@/app/admin/page';
import { Edit3 } from 'lucide-react';

interface EditableWrapperProps {
  children: React.ReactNode;
  onEdit: () => void;
  className?: string;
}

export function EditableWrapper({ children, onEdit, className = '' }: EditableWrapperProps) {
  const { isEditMode } = useEditContext();

  if (!isEditMode) {
    return <>{children}</>;
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onEdit();
      }}
      className={`cursor-pointer border-2 border-dashed border-blue-400 hover:border-blue-600 hover:bg-blue-50/10 transition-all group ${className}`}
    >
      {children}
      <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1.5 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 z-50 shadow-lg">
        <Edit3 className="h-3 w-3" />
        Edit
      </div>
    </div>
  );
}

