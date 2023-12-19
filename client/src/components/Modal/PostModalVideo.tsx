import { useState, useRef, ChangeEvent } from "react";
import { CiVideoOn } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

interface PostModalVideoProps {
  setVideo: React.Dispatch<React.SetStateAction<File | null>>;
}

const PostModalVideo: React.FC<PostModalVideoProps> = ({ setVideo }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

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

  return (
    <div className="VideoInput">
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {videoPreview ? (
        <div className="realtive">
          <video
            className="w-36 h-36"
            controls
            src={videoPreview}
          />
          <div
            className='text-white absolute top-2 right-4 p-1 rounded-full bg-blue-300 cursor-pointer hover:bg-blue-500'
            onClick={() => setVideoPreview(null)
            }>
            <IoMdClose className="text-xl" />
          </div>
        </div>
      ) : 
      <>
        <CiVideoOn className="text-2xl cursor-pointer" onClick={handleChoose} />
      </>
      }
    </div>
  );
};

export default PostModalVideo;
