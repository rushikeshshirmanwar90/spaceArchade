// Upload single or multiple images to Cloudinary
export const handleImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setImages: React.Dispatch<React.SetStateAction<string[]>> | ((urls: string[]) => void),
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<string[]> => {
  if (!e.target.files?.length) return [];

  setIsLoading(true);

  try {
    const uploadPromises = Array.from(e.target.files).map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'realEstate');

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/do6v48jbp/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Cloudinary error:', errorData);
          throw new Error(errorData.error?.message || 'Upload failed');
        }

        const data = await response.json();
        console.log('Image uploaded successfully:', data.secure_url);
        return data.secure_url;
      } catch (error) {
        console.error('Upload failed for file:', file.name, error);
        return null;
      }
    });

    const urls = (await Promise.all(uploadPromises)).filter(Boolean) as string[];
    
    if (urls.length === 0) {
      throw new Error('No images were uploaded successfully');
    }

    // Call the setImages callback with the new URLs
    setImages(urls);
    
    setIsLoading(false);
    return urls;
  } catch (error) {
    console.error('Image upload error:', error);
    setIsLoading(false);
    throw error;
  }
};

// Upload a single image (helper function for edit modal)
export const handleSingleImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  onSuccess: (url: string) => void,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<string | null> => {
  if (!e.target.files?.length) return null;

  setIsLoading(true);

  try {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'realEstate');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/do6v48jbp/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cloudinary error:', errorData);
      throw new Error(errorData.error?.message || 'Upload failed');
    }

    const data = await response.json();
    const url = data.secure_url;
    
    console.log('Image uploaded successfully:', url);
    onSuccess(url);
    
    setIsLoading(false);
    return url;
  } catch (error) {
    console.error('Image upload error:', error);
    alert('Failed to upload image. Please try again.');
    setIsLoading(false);
    return null;
  }
};

export const removeImage = (
  index: number,
  setImages: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setImages((prevImages) => prevImages.filter((_, i) => i !== index));
};
