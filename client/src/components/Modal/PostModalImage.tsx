import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { CiImageOff } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import { Input } from '../ui/input'
import usePostModel from '@/store/userPostModel'

interface PostModalImageProps {
  setFile: React.Dispatch<React.SetStateAction<File | null>>
}

const PostModalImage: React.FC<PostModalImageProps> = ({ setFile }) => {
  const { imageStore } = usePostModel()
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if(imageStore) {
      setFilePreview(imageStore)
    }
  },[imageStore])

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

  const imageDelete = () => {
    setFilePreview(null)
    usePostModel.setState({
      imageStore: ""
    });
  }


  return (
    <div className='flex'>
      <Input
        className='hidden'
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
      />
      {filePreview ?
        <div className='relative w-full'>
          <img className='w-36 h-36 object-cover' src={filePreview} alt="File Preview" />
          <div
            className='text-white absolute top-2 right-4 p-1 rounded-full bg-blue-300 cursor-pointer hover:bg-blue-500'
            onClick={imageDelete}>
            <IoMdClose className="text-xl" />
          </div>
        </div> :
        <>
          <CiImageOff className="text-2xl cursor-pointer" onClick={handleButtonClick} />
        </>
      }
    </div>
  )
}

export default PostModalImage
