import React, { FormEvent, useRef, useState } from 'react'

interface MyInfoImageProps {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  profileImage: string | null | undefined
}

const MyInfoImage:React.FC<MyInfoImageProps> = ({setFile, profileImage}) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = (e: FormEvent) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        setFilePreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    } else {
      setFilePreview(null);
    }
  };

  return (
    <>
      <label className="text-md block text-gray-700 font-semibold mb-2">Profile Image</label>
      <input
        className='hidden'
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
      />
      {filePreview ?
        <img 
          className='w-60 h-60 object-cover rounded-full cursor-pointer' 
          src={filePreview} 
          alt="File Preview" 
          onClick={handleButtonClick}
        />
      :
        <img
          src={profileImage ? profileImage : '/public/user.png'}
          alt="Profile Image"
          className="w-60 h-60 rounded-full cursor-pointer object-cover"
          onClick={handleButtonClick}
        />
      }
    </>
  )
}

export default MyInfoImage
