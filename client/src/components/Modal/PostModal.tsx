import { FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { handlePostSubmit } from '@/lib/postApi';
import Loading from '@/components/ui/Loading';
import Modal from '@/components/ui/Modal';
import usePostModel from '@/hook/userPostModel';
import customToast from '../ui/customToast';
import PostModalImage from './PostModalImage';
import PostModalVideo from './PostModalVideo';

const PostModal = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
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
      await handlePostSubmit(title, description, file, video, token);
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
      <div className='flex gap-4'>
        <PostModalImage 
          setFile={setFile}
        />
        <PostModalVideo 
          setVideo={setVideo}
        />
      </div>
        <div className='flex justify-end items-center'>
          <button 
            className='shadow-lg bg-green-400 text-white hover:bg-green-500 w-20 h-12 rounded-full' 
            onClick={(e) => updatePostMutation.mutate(e)}
          >
            Post
          </button>
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
