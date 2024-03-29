import { FormEvent, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { handlePostSubmit, handlePostUpdate } from '@/lib/postApi';
import Loading from '@/components/ui/Loading';
import Modal from '@/components/ui/Modal';
import usePostModel from '@/store/userPostModel';
import customToast from '../ui/customToast';
import PostModalImage from './PostModalImage';
import PostModalVideo from './PostModalVideo';
import { status401Error, status402Error } from '@/lib/userApi';
import axios from 'axios';

const PostModal = () => {
  const { titleStore, descriptionStore, imageStore, videoStore, postIdStore } = usePostModel()

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const postModel = usePostModel();
 
  const queryClient = useQueryClient()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      return status402Error()
    }

    if (!title || !description) {
      return alert("제목이나 내용을 입력해주세요")
    }

    try {
      setLoading(true);
      if (postIdStore) {
        await handlePostUpdate(title, description, file, video, token, postIdStore, imageStore, videoStore);
      } else {
        await handlePostSubmit(title, description, file, video, token);
      }

      setTitle("")
      setDescription("")
      setFile(null)
      setVideo(null)

      customToast('succes', postIdStore ? "포스트 수정이 완료되었습니다" : "포스트가 완료되었습니다.")
      postModel.onClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 401) {
          status401Error()
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const updatePostMutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", "mypost"] });
    },
    onError: (err) => {
      console.log(err)
    }
  })

  useEffect(() => {
    setTitle(titleStore)
    setDescription(descriptionStore)
  }, [titleStore, descriptionStore, updatePostMutation.mutate])

  if (loading) {
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
      <div className='flex flex-col gap-2 relative'>
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
      title={titleStore === "" ? "글 쓰기" : "글 수정하기"}
      body={bodyContent}
      isOpen={postModel.isOpen}
      onClose={postModel.onClose}
    />
  );
};

export default PostModal;
