const news = [
  {
    id: 'openai-next-model',
    category: 'AI',
    title: 'OpenAI Unveils Next Generation AI Model',
    description: 'New capabilities promise stronger reasoning, coding, and enterprise automation.',
    isPremium: true,
    image: 'https://picsum.photos/600/400?random=1'
  },
  {
    id: 'google-gemini-update',
    category: 'AI',
    title: 'Google Improves Gemini AI Performance',
    description: 'The latest Gemini update focuses on speed, accuracy, and developer productivity.',
    image: 'https://picsum.photos/600/400?random=2'
  },
  {
    id: 'meta-open-ai',
    category: 'AI',
    title: 'Meta Expands Open Source AI Strategy',
    description: 'Meta continues investing in open AI models for developers and researchers.',
    image: 'https://picsum.photos/600/400?random=3'
  },
  {
    id: 'ai-agents-business',
    category: 'AI',
    title: 'AI Agents Enter Business Workflows',
    description: 'Companies are testing autonomous AI agents for sales, support, and operations.',
    image: 'https://picsum.photos/600/400?random=4'
  },
  {
    id: 'startup-funding',
    category: 'Startups',
    title: 'Tech Startup Funding Rebounds',
    description: 'Investors return to promising AI, SaaS, and infrastructure startups.',
    image: 'https://picsum.photos/600/400?random=5'
  },
  {
    id: 'ai-productivity-startup',
    category: 'Startups',
    title: 'AI Startup Launches Productivity Platform',
    description: 'A new platform promises to automate repetitive business tasks using AI.',
    image: 'https://picsum.photos/600/400?random=6'
  },
  {
    id: 'fintech-growth',
    category: 'Startups',
    title: 'Fintech Startups See Renewed Growth',
    description: 'Digital payments and lending startups are gaining new investor attention.',
    image: 'https://picsum.photos/600/400?random=7'
  },
  {
    id: 'saas-startups',
    category: 'Startups',
    title: 'SaaS Startups Shift Toward AI Features',
    description: 'Software companies are embedding AI assistants into daily workflows.',
    image: 'https://picsum.photos/600/400?random=8'
  },
  {
    id: 'cybersecurity-alert',
    category: 'Security',
    title: 'Global Cybersecurity Alert Issued',
    description: 'Security experts warn companies about a new wave of phishing and malware attacks.',
    image: 'https://picsum.photos/600/400?random=9'
  },
  {
    id: 'cloud-security-risk',
    category: 'Security',
    title: 'Cloud Security Risks Rise For Enterprises',
    description: 'Misconfigured cloud systems remain a major source of data exposure.',
    image: 'https://picsum.photos/600/400?random=10'
  },
  {
    id: 'ransomware-warning',
    category: 'Security',
    title: 'Ransomware Groups Target Small Businesses',
    description: 'Security teams urge companies to improve backups and employee training.',
    image: 'https://picsum.photos/600/400?random=11'
  },
  {
    id: 'passwordless-security',
    category: 'Security',
    title: 'Passwordless Login Adoption Increases',
    description: 'More companies are replacing passwords with passkeys and biometric authentication.',
    image: 'https://picsum.photos/600/400?random=12'
  },
  {
    id: 'javascript-frameworks',
    category: 'Programming',
    title: 'JavaScript Frameworks Continue To Evolve',
    description: 'Frontend developers are adopting faster tooling and modern rendering patterns.',
    image: 'https://picsum.photos/600/400?random=13'
  },
  {
    id: 'react-performance',
    category: 'Programming',
    title: 'React Developers Focus On Performance',
    description: 'Teams are optimizing rendering, routing, and data loading for better user experience.',
    image: 'https://picsum.photos/600/400?random=14'
  },
  {
    id: 'developer-ai-tools',
    category: 'Programming',
    title: 'AI Coding Tools Become Mainstream',
    description: 'Developers increasingly rely on AI assistants for debugging and code generation.',
    image: 'https://picsum.photos/600/400?random=15'
  },
  {
    id: 'backend-api-trends',
    category: 'Programming',
    title: 'Backend API Design Moves Toward Simplicity',
    description: 'Modern APIs prioritize security, performance, and developer experience.',
    image: 'https://picsum.photos/600/400?random=16'
  },
  {
    id: 'cloud-computing',
    category: 'Cloud',
    title: 'Cloud Providers Race To Build AI Infrastructure',
    description: 'Demand for compute continues growing as companies deploy AI workloads.',
    image: 'https://picsum.photos/600/400?random=17'
  },
  {
    id: 'edge-computing',
    category: 'Cloud',
    title: 'Edge Computing Gains Enterprise Interest',
    description: 'Businesses are moving workloads closer to users for faster performance.',
    image: 'https://picsum.photos/600/400?random=18'
  },
  {
    id: 'serverless-growth',
    category: 'Cloud',
    title: 'Serverless Platforms Expand Developer Adoption',
    description: 'Serverless tools help startups ship faster without managing infrastructure.',
    image: 'https://picsum.photos/600/400?random=19'
  },
  {
    id: 'multi-cloud',
    category: 'Cloud',
    title: 'Multi-Cloud Strategies Become Standard',
    description: 'Large enterprises are distributing workloads across multiple cloud providers.',
    image: 'https://picsum.photos/600/400?random=20'
  },
  {
    id: 'apple-ai',
    category: 'Gadgets',
    title: 'Apple Introduces New AI Features',
    description: 'AI-powered experiences are coming to future devices and operating systems.',
    image: 'https://picsum.photos/600/400?random=21'
  },
  {
    id: 'smartphone-ai',
    category: 'Gadgets',
    title: 'Smartphones Add More On-Device AI',
    description: 'New chips enable faster image editing, voice assistants, and privacy-focused AI.',
    image: 'https://picsum.photos/600/400?random=22'
  },
  {
    id: 'wearable-health-tech',
    category: 'Gadgets',
    title: 'Wearables Expand Health Monitoring Features',
    description: 'Smartwatches continue adding sensors for fitness, sleep, and wellness tracking.',
    image: 'https://picsum.photos/600/400?random=23'
  },
  {
    id: 'next-gen-laptops',
    category: 'Gadgets',
    title: 'Next Generation AI Laptops Arrive',
    description: 'PC makers are introducing dedicated AI chips for productivity and creativity.',
    image: 'https://picsum.photos/600/400?random=24'
  }
]

export default news