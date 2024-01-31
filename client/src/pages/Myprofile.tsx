import PostModal from "@/components/Modal/PostModal";
import MyInfo from "@/components/Myprofile/MyInfo";
import Myposts from "@/components/Myprofile/Myposts";
import MyprofileTab from "@/components/Myprofile/MyprofileTab";
import useAuth from "@/store/useAuth";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface TabComponents {
  myinfo: ReactNode; 
  myposts: ReactNode;
  [key: string]: ReactNode; 
}

const Myprofile = () => {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<string>("myinfo")
  const { getMe } = useAuth();

  const { isLoading, data } = useQuery({
    queryKey: ['users'],
    queryFn: getMe,
  });

  const param = searchParams.get('profile');
  
  useEffect(() => {
    const tabValue = String(param).split('?')[0]; 
    const paramMapping: { [key: string]: string } = {
      'null': "myinfo",
      'myposts': "myposts",
    };
    
    setTab(paramMapping[tabValue] || "myinfo");
  }, [param]);

  const tabComponents: TabComponents = {
    myinfo: <MyInfo isLoading={isLoading} user={data} />,
    myposts: <Myposts isLoading={isLoading} user={data} />,
  };
  
  const profileTab: ReactNode = tabComponents[tab] 

  return (
    <>
      <div className="pl-4 py-4 w-full">
        <MyprofileTab 
          setTab={setTab}
          tab={tab}
        />
          {profileTab}
      </div>
      <PostModal />
    </>
  )
}

export default Myprofile
