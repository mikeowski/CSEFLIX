import Link from 'next/link'
import React from 'react'
import { trpc } from '../../utils/trpc'
interface PropTypes {
    id: number
    name: string
}
export const CategorieCard = ({id,name}:PropTypes) => {
    const {
        data:movieByCategorie,
        isLoading:movieByCategorieLoading,
        isError: movieByCategorieError,
        isSuccess:movieByCategorieSuccess,
      }=trpc.movieRouter.getMoviesByCategory.useQuery({id: id})
      const index = Math.floor(Math.random() * 40);
  return (
    <>
        {movieByCategorieSuccess&&
        <Link href={`/categories/${id}`}>
            <div className="text-white select-none text-center flex items-center justify-center w-52 h-32 rounded text-xl font-bold cursor-pointer border-[2px] border-slate-600"
                style={{background:`url('https://image.tmdb.org/t/p/w500${movieByCategorie[index]?.backdrop_path}')`,backgroundSize:"cover" }} >
                <div className='absolute w-52 h-32 flex justify-center items-center bg-cover bg-black bg-opacity-10 shadow-inner shadow-black'>
                    {name}
                </div>
            </div>
        </Link>
        }
        {movieByCategorieLoading && 
            <div className="text-white text-center flex items-center bg-gray-900 animate-pulse justify-center w-52 h-32 rounded text-xl font-bold cursor-pointer border">
                {name}
            </div>
        }
    </>
  )
}
