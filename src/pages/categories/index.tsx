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
        <div style={{ display: 'flex', gap: '10px' }}>
          {categories.genres.map((categorie) => (
            <Link key={categorie.id} href={`/categories/${categorie.id}`}>
              {categorie.name}
            </Link>
          ))}
        </div>
      )}
    </Layout>
  )
}

export default Popular
