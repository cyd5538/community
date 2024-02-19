import { PostType } from "@/types/types"

import { AiFillEdit } from "react-icons/ai"
import MypostDelbtn from "./MypostDelbtn"
import usePostModel from "@/store/userPostModel"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import MypostComment from "./MypostComment"

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
    <Card className="p-2 drop-shadow-md shadow-black rounded-md border-[1px] border-gray ">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <div>
        {post.image ?
          <img className="w-auto h-auto mx-auto mb-2" src={post.image} alt={post.title} /> :
          null
        }
        {post.video ?
          <video className="w-auto h-auto mx-auto mb-2" src={post.video} idth={500} height={300} controls/> :
          null
        }
        <span className="pb-2">{post.comments.length}개의 댓글</span>
        {post?.comments.map(comment => (
          <MypostComment 
            comment={comment}
            likeLength={post.likes.length}
            dislikeLength={post.disLikes.length}
          />
        ))}
        <div className="flex flex-col gap-2">
          <div className="flex justify-end gap-4">
            <div onClick={handleEditClick} className="cursor-pointer">
              <AiFillEdit size={16} />
            </div>
            <MypostDelbtn id={post?._id} />
          </div>
        </div>
      </div>
    </Card>

  )
}

export default Mypost
