import Link from 'next/link'
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
          {categories.genres.map((categorie) => (
            <Link key={categorie.id} href={`/categories/${categorie.id}`}>
              <div className="text-white text-center flex items-center justify-center w-52 h-32 rounded text-xl font-bold cursor-pointer border">
                {categorie.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </Layout>
  )
}

export default Popular
