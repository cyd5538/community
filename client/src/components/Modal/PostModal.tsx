import { FormEvent, useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { handlePostSubmit } from '@/lib/postApi';
import Loading from '../ui/Loading';
import Modal from '../ui/Modal';
import usePostModel from '@/hook/userPostModel';
import { IoMdClose } from "react-icons/io";
import { CiImageOff } from "react-icons/ci";

const PostModal = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const postModel = usePostModel();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = (e:FormEvent) => {
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
    } else {
      setFilePreview(null);
    }
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      setLoading(true); 
      await handlePostSubmit(title, description, file, token);
      setTitle("")
      setDescription("")
      setFile(null)
      postModel.onClose()
      alert("포스트가 완료되었습니다.")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false); 
    }
  };

  if(loading) {
    return <Loading />
  }
  const bodyContent = (
    <form className='flex gap-4 flex-col'>
      <Input
        type="text"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        rows={4}
        placeholder="내용을 입력해주세요."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className='flex gap-4 justify-between'>
        <Input
          className='hidden'
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
        />
        {filePreview ? 
        <div className='relative w-full'>
          <img className='w-full h-48 object-cover' src={filePreview} alt="File Preview" /> 
          <div className='text-white absolute top-2 right-4 p-1 rounded-full bg-blue-300 cursor-pointer hover:bg-blue-500' onClick={() => setFilePreview(null)}>
            <IoMdClose className="text-xl"/>
          </div>
        </div> :
        <>
          <CiImageOff className="text-2xl cursor-pointer" onClick={handleButtonClick}/>
        </>
        }
        <div className='flex justify-end items-center'>
          <button className='shadow-lg bg-green-400 text-white hover:bg-green-500 w-20 h-12 rounded-full' onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <Modal
      title="글 쓰기"
      body={bodyContent}
      isOpen={postModel.isOpen}
      onClose={postModel.onClose}
    />
  );
};

export default PostModal;
