import { useState, useEffect } from 'react';

export function useLocalStorageImage(key: string, defaultUrl: string) {
  const [imageUrl, setImageUrl] = useState<string>(() => {
    const saved = localStorage.getItem(key);
    return saved || defaultUrl;
  });

  const uploadImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      localStorage.setItem(key, base64String);
      setImageUrl(base64String);
    };
    reader.readAsDataURL(file);
  };

  const resetImage = () => {
    localStorage.removeItem(key);
    setImageUrl(defaultUrl);
  };

  return { imageUrl, uploadImage, resetImage };
}
