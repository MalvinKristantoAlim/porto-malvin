import React, { useRef } from 'react';
import { Upload, RotateCcw } from 'lucide-react';

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  onReset: () => void;
  label: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload, onReset, label }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
      <button
        onClick={() => fileInputRef.current?.click()}
        className="p-2 bg-emerald-primary/20 hover:bg-emerald-primary/40 border border-emerald-primary/30 rounded-full backdrop-blur-md text-emerald-primary transition-colors"
        title={`Upload ${label}`}
      >
        <Upload size={16} />
      </button>
      <button
        onClick={onReset}
        className="p-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 rounded-full backdrop-blur-md text-red-400 transition-colors"
        title={`Reset ${label}`}
      >
        <RotateCcw size={16} />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};
