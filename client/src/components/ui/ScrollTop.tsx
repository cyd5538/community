import useScroll from '@/hook/useScroll';
import { ArrowUpFromDot } from 'lucide-react';

const ScrollTop = () => {
  const position = useScroll()

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
    onClick={handleScrollTop}
    className={`${position.y > 1600 ? "block" : "hidden"}
    bottom-4 right-[50px] fixed 
    cursor-pointer w-10 h-10 rounded-full bg-green-500/70 flex justify-center 
    items-center hover:shadow-md hover:translate-y-[-4px]`}
    >
      <ArrowUpFromDot size={17} color="#fff"/>
    </div>
  )
}

export default ScrollTop
