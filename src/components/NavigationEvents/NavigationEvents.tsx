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
 
  useEffect(() => {
     setProgress(100)
    // You can now use the current URL
    // ...
  }, [pathname, searchParams])
 
  return <LoadingBar progress={progress} onLoaderFinished={()=>setProgress(0)} />

}