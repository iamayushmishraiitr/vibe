import Loader from '@/components/Loader'
import Postcards from '@/components/Postcards'
import TopCreators from '@/components/TopCreators'
import { request } from '@/reqHandler'
import { useEffect, useState } from 'react'

const Likes = () => {
  const [data, setData] = useState<any[]>([])
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request.get('likedPost', {
          params: { id: localStorage.getItem('userId') }
        })
        setData(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoader(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='flex h-[100vh] w-[100%] text-white'>
      <div className='bg-slate-800 h-[100%] w-[66%] overflow-auto hide-scrollbar'>
        {loader ? (
          <Loader />
        ) : data.length === 0 ? (
          <p>No Post Has Been Liked</p>
        ) : (
            data?.map((item ,index)=>(
              <Postcards  index={index}  heading={"like"} post={item} />
              )
            )
        )}
      </div>
      <div className="w-[34%] pl-3 bg-black hide-scrollbar">
        <TopCreators />
      </div>
    </div>
  )
}

export default Likes
