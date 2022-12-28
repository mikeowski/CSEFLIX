import Link from 'next/link'
import { CategorieCard } from '../../components/CategorieCard'
import { Layout } from '../../components/common'
import { trpc } from '../../utils/trpc'

const Popular = () => {
  const {
    data: categories,
    isLoading,
    isError,
    isSuccess,
  } = trpc.movieRouter.getCategories.useQuery()
  
  return (
    <Layout title="Categories">
      {isLoading && <div>LOADİNG</div>}
      {isError && <div>ERROR </div>}
      {isSuccess && categories && (
        <div className="flex flex-wrap w-full mx-auto justify-center mt-32 gap-10">
          {categories.genres.map((categorie: { id: number; name: string },ind) => (
              <CategorieCard id={categorie.id} name={categorie.name} key={ind}/>
          ))}
        </div>
      )}
    </Layout>
  )
}

export default Popular
