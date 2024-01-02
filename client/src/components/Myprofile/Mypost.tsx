import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
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
  const width = useWindowWidth()
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
    <TableBody>
      <TableRow>
        {width > 650 ?
          <TableCell>
            {post.image && <img className="w-12 h-12" src={post.image} alt={post.title} />}
          </TableCell> : 
          <></>
        }
        <TableCell className="flex flex-col">
          <div className="font-bold">{post.title}</div>
          <div>{post.description}</div>
        </TableCell>
        <TableCell className="text-center">{post.comments.length}</TableCell>
        <TableCell className="flex flex-col gap-2">
          <div className="text-center">
            {format(parseISO(post.createdAt), 'yy-MM-dd')}
          </div>
          <div className="flex justify-center gap-4">
            <div onClick={handleEditClick} className="hover:bg-green-500 bg-green-300 text-lg px-[8px] py-[8px] rounded-full cursor-pointer">
              <AiFillEdit size={16}/>
            </div>
            <MypostDelbtn id={post?._id}/>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>

  )
}

export default Mypost
