import usePostModel from "@/store/userPostModel";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import { CiVideoOn } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

interface PostModalVideoProps {
  setVideo: React.Dispatch<React.SetStateAction<File | null>>;
}

const PostModalVideo: React.FC<PostModalVideoProps> = ({ setVideo }) => {
  const { videoStore } = usePostModel()
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  useEffect(() => {
    if(videoStore) {
      setVideoPreview(videoStore)
    }
  },[videoStore])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
      setVideo(file);
    }
  };

  const handleChoose = () => {
    inputRef.current?.click();
  };

  const videoDelete = () => {
    setVideoPreview(null)
    usePostModel.setState({
      imageStore: ""
    });
  }

  return (
    <div className="">
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {videoPreview ? (
        <div className="relative">
          <video
            className="w-ful h-auto"
            controls
            src={videoPreview}
          />
          <div
            className='text-white absolute top-2 right-4 p-1 rounded-full bg-blue-300 cursor-pointer hover:bg-blue-500'
            onClick={videoDelete}>
            <IoMdClose className="text-xl" />
          </div>
        </div>
      ) : 
      <>
        <CiVideoOn className="text-2xl cursor-pointer absolute bottom-[-30px] left-8" onClick={handleChoose} />
      </>
      }
    </div>
  );
};

export default PostModalVideo;
