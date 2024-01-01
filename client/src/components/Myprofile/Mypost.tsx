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

interface MypostProp {
  post: PostType
}

const Mypost: React.FC<MypostProp> = ({ post }) => {
  const width = useWindowWidth()

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
            <AiFillEdit size={16} />
            <MypostDelbtn id={post?._id}/>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>

  )
}

export default Mypost
