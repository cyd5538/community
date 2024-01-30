import useWindowWidth from "@/hook/useWindowWidth"
import { PostType } from "@/types/types"
import { format, parseISO } from "date-fns"
import { AiFillEdit } from "react-icons/ai"
import MypostDelbtn from "./MypostDelbtn"
import usePostModel from "@/store/userPostModel"

interface MypostProp {
  post: PostType
}

const Mypost: React.FC<MypostProp> = ({ post }) => {
  const postModal = usePostModel()

  const handleEditClick = () => {
    postModal.onOpen();
    usePostModel.setState({
      titleStore: post.title || "",
      descriptionStore: post.description || "",
      imageStore: post.image || "",
      videoStore: post.video || "",
      postIdStore: post._id || ""
    });
  }

  return (
    <div className="p-2 drop-shadow-md shadow-black rounded-md border-[1px] border-gray ">
      <div>
        {post.image ? 
          <img className="w-auto h-40 mb-2" src={post.image} alt={post.title} /> : 
          <div className="w-auto h-40 flex justify-center items-center text-gray-300 mb-2">사진이 없습니다.</div>
        }
        <div className="flex flex-col h-32 overflow-hidden w-full">
          <h2 className="font-semibold text-xl break-words mb-2">{post.title}</h2>
          <h3 className="h-24 text-sm break-words">{post.description}</h3>      
        </div>
        <div className="text-left text-xs pr-2 mb-4 mt-8 flex gap-2 text-gray-500">
          <p>{format(parseISO(post.createdAt), 'yy년 MM월dd일')}</p>
          <p>{post.comments.length}개의 댓글</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-end gap-4">
            <div onClick={handleEditClick} className="cursor-pointer">
              <AiFillEdit size={16} />
            </div>
            <MypostDelbtn id={post?._id} />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Mypost
