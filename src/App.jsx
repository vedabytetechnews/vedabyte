import Navbar from './components/layout/Navbar'

function App() {
  return (
    <div className="vb-page">
      <Navbar />

      <main className="vb-container">

        {/* Breaking News */}
        <section className="vb-breaking">
          🔥 BREAKING • OpenAI launches next-generation AI model • NVIDIA announces new AI chips • Apple WWDC coverage live
        </section>

        {/* Hero Layout */}
        <section className="vb-layout">

          {/* Featured Article */}
          <div className="vb-featured">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80"
              alt="AI Technology"
            />

            <div className="vb-featured-content">
              <span className="vb-tag">FEATURED</span>

              <h1>
                The Future of Artificial Intelligence Is Arriving Faster Than Expected
              </h1>

              <p>
                Breaking analysis, startup news, AI innovation and technology
                trends from around the world.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="vb-sidebar">

            <div className="vb-widget">
              <h3>Search</h3>

              <input
                type="text"
                className="vb-search"
                placeholder="Search articles..."
              />
            </div>

            <div className="vb-widget">
              <h3>Trending</h3>

              <div className="vb-post-item">
                🤖 OpenAI launches new model
              </div>

              <div className="vb-post-item">
                🚀 Startup funding reaches record highs
              </div>

              <div className="vb-post-item">
                🔐 Major cybersecurity warning issued
              </div>

              <div className="vb-post-item">
                📱 Apple reveals AI-powered features
              </div>
            </div>

            <div className="vb-widget">
              <h3>Categories</h3>

              <div className="vb-category">Artificial Intelligence</div>
              <div className="vb-category">Startups</div>
              <div className="vb-category">Cybersecurity</div>
              <div className="vb-category">Programming</div>
              <div className="vb-category">Gadgets</div>
            </div>

            <div className="vb-quote">
              <h3>VedaByte Insight</h3>

              <p>
                Delivering the latest technology news, startup stories and AI
                innovations to readers worldwide.
              </p>
            </div>

          </aside>

        </section>

        {/* News Grid */}
        <section className="vb-news-grid">

          {[1, 2, 3, 4, 5, 6].map((item) => (
            <article key={item} className="vb-card">

              <img
                src={`https://picsum.photos/600/400?random=${item}`}
                alt="News"
              />

              <div className="vb-card-content">

                <span className="vb-tag">
                  TECHNOLOGY
                </span>

                <h3>
                  Sample Tech News Headline For VedaByte
                </h3>

                <p>
                  AI, startups, cybersecurity and emerging technologies from
                  around the globe.
                </p>

              </div>

            </article>
          ))}

        </section>

      </main>
    </div>
  )
}

export default App