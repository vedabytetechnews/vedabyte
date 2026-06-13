import { useParams } from 'react-router-dom'
import NewsCard from '../components/news/NewsCard'
import news from '../data/news'

export default function Category() {
  const { slug } = useParams()

  const filteredNews = news.filter(article =>
    article.category.toLowerCase() === slug.toLowerCase()
  )

  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 20px'
      }}
    >
      <h1
        style={{
          color: '#fff',
          marginBottom: '30px',
          textTransform: 'capitalize'
        }}
      >
        {slug} News
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
          gap: '25px'
        }}
      >
        {filteredNews.map(article => (
          <NewsCard
            key={article.id}
            {...article}
          />
        ))}
      </div>
    </div>
  )
}