import { FormEvent, useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { handlePostSubmit } from '@/lib/postApi';
import Loading from '@/components/ui/Loading';
import Modal from '@/components/ui/Modal';
import usePostModel from '@/hook/userPostModel';
import { IoMdClose } from "react-icons/io";
import { CiImageOff } from "react-icons/ci";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customToast from '../ui/customToast';

const PostModal = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const postModel = usePostModel();

  const queryClient = useQueryClient()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if(!title || !description) {
      return alert("제목이나 내용을 입력해주세요")
    }

    try {
      setLoading(true); 
      await handlePostSubmit(title, description, file, token);
      setTitle("")
      setDescription("")
      setFile(null)
      customToast('succes', "포스트가 완료되었습니다.")
      postModel.onClose();
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false); 
    }
  };
  
  const updatePostMutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"]});
    },
    onError : (err) => {
      console.log(err)
    }
  })

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
      setFile(selectedFile);
    } else {
      setFilePreview(null);
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
          <div 
            className='text-white absolute top-2 right-4 p-1 rounded-full bg-blue-300 cursor-pointer hover:bg-blue-500' 
            onClick={() => setFilePreview(null)
          }>
            <IoMdClose className="text-xl"/>
          </div>
        </div> :
        <>
          <CiImageOff className="text-2xl cursor-pointer" onClick={handleButtonClick}/>
        </>
        }
        <div className='flex justify-end items-center'>
          <button 
            className='shadow-lg bg-green-400 text-white hover:bg-green-500 w-20 h-12 rounded-full' 
            onClick={(e) => updatePostMutation.mutate(e)}
          >
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
