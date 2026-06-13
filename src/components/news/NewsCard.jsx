import { Link } from 'react-router-dom'

export default function NewsCard({
  id,
  title,
  category,
  image,
  description
}) {
  return (
    <Link
      to={`/article/${id}`}
      style={{
        textDecoration: 'none',
        display: 'block'
      }}
    >
      <article
        style={{
          background: '#111111',
          border: '1px solid #232323',
          borderRadius: '18px',
          overflow: 'hidden',
          transition: '0.25s',
          cursor: 'pointer',
          height: '100%'
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '220px',
            objectFit: 'cover'
          }}
        />

        <div style={{ padding: '18px' }}>
          <span
            style={{
              color: '#D4AF37',
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase'
            }}
          >
            {category}
          </span>

          <h3
            style={{
              color: '#ffffff',
              marginTop: '10px',
              lineHeight: '1.4',
              fontSize: '20px'
            }}
          >
            {title}
          </h3>

          <p
            style={{
              color: '#9CA3AF',
              marginTop: '10px',
              fontSize: '14px'
            }}
          >
            {description}
          </p>
        </div>
      </article>
    </Link>
  )
}