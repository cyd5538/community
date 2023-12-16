import { FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import Modal from '../ui/Modal';
import usePostModel from '@/hook/userPostModel';

const PostModal = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const postModel = usePostModel();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

  };

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
        <Input
          className='h-32'
          type="file"
          placeholder="업로드할 이미지를 선택해주세요"
          onChange={handleFileChange}
        />
        <div className='flex justify-center items-center'>
          <button className='shadow-lg bg-green-400 text-white hover:bg-green-500 w-40 h-16 rounded-full' onClick={handleSubmit}>
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
