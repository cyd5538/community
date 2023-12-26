import MyInfo from "@/components/Myprofile/MyInfo";
import Mypost from "@/components/Myprofile/Mypost";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Myprofile = () => {

  return (
    <div>
      <Tabs defaultValue="profile" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="profile">내 정보</TabsTrigger>
          <TabsTrigger value="mypost">내 글 목록</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <MyInfo />
        </TabsContent>
        <TabsContent value="mypost">
          <Mypost />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Myprofile
