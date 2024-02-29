'use client'
import { useEffect , useState , useContext} from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import LoadingBar from 'react-top-loading-bar'
import ThemeContext from '@/context/themeContext'
export function NavigationEvents() {
  const [progress,setProgress] = useState(0)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const {darkTheme} = useContext(ThemeContext)

  const color = darkTheme ? '#e3e3e3' : '#026057'
 
  useEffect(() => {
     setProgress((prevProgress)=>prevProgress + 40)
     setTimeout(()=>{
      setProgress(100);
     },500)
  
    // You can now use the current URL
    // ...
  }, [pathname, searchParams])
 
  return <LoadingBar progress={progress} waitingTime={200} height={4} color={color} onLoaderFinished={()=>setProgress(0)} />

}