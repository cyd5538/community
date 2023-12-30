import MyInfo from "@/components/Myprofile/MyInfo";
import Myposts from "@/components/Myprofile/Myposts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useAuth from "@/store/useAuth";
import { useQuery } from "@tanstack/react-query";

const Myprofile = () => {
  const { getMe } = useAuth();

  const { isLoading, data } = useQuery({
    queryKey: ['users'],
    queryFn: getMe,
  });

  return (
    <div>
      <Tabs defaultValue="profile" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="profile">내 정보</TabsTrigger>
          <TabsTrigger value="mypost">내 글 목록</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <MyInfo isLoading={isLoading} user={data} />
        </TabsContent>
        <TabsContent value="mypost">
          <Myposts isLoading={isLoading} user={data} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Myprofile
