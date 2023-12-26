import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useUserInfo from '@/hook/getUser';

const Myprofile = () => {

  return (
    <div>
      <Tabs defaultValue="profile" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="profile">내 정보</TabsTrigger>
          <TabsTrigger value="mypost">내 글 목록</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          내 정보
        </TabsContent>
        <TabsContent value="mypost">
          내 글 목록
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Myprofile
