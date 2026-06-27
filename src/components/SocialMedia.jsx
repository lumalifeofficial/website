import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube, FaTwitter } from 'react-icons/fa'

const socialPlatforms = [
  {
    name: 'Instagram',
    icon: FaInstagram,
    handle: '@lumalifeofficial',
    followers: '125K',
    color: 'from-purple-400 via-pink-400 to-orange-300',
    url: 'https://instagram.com/lumalifeofficial',
    description: 'Daily cuteness & product showcases',
  },
  {
    name: 'Facebook',
    icon: FaFacebookF,
    handle: 'LumaLife Official',
    followers: '89K',
    color: 'from-blue-400 to-blue-500',
    url: 'https://facebook.com/lumalifeofficial',
    description: 'Community deals & live events',
  },
  {
    name: 'TikTok',
    icon: FaTiktok,
    handle: '@lumalifeofficial',
    followers: '250K',
    color: 'from-gray-700 to-gray-800',
    url: 'https://tiktok.com/@lumalifeofficial',
    description: 'Viral unboxings & kawaii hauls',
  },
  {
    name: 'YouTube',
    icon: FaYoutube,
    handle: 'LumaLife Official',
    followers: '45K',
    color: 'from-red-400 to-red-500',
    url: 'https://youtube.com/@lumalifeofficial',
    description: 'Reviews, tutorials & vlogs',
  },
  {
    name: 'Twitter / X',
    icon: FaTwitter,
    handle: '@lumalifeofficial',
    followers: '32K',
    color: 'from-gray-600 to-gray-700',
    url: 'https://x.com/lumalifeofficial',
    description: 'Updates, launches & giveaways',
  },
]

export default function SocialMedia() {
  return (
    <section id="contact" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-ribbon-red font-semibold text-sm uppercase tracking-wider">Stay Connected</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-2 mb-4">
            Follow Us ♡
          </h2>
          <p className="text-warm-brown/60 max-w-2xl mx-auto">
            Join our adorable community for exclusive deals, sneak peeks, behind-the-scenes content, and daily smiles.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialPlatforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-peach/30"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-85 group-hover:opacity-100 transition-opacity`}></div>

              {/* Content */}
              <div className="relative z-10 text-white">
                <div className="flex items-center justify-between mb-4">
                  <platform.icon size={32} />
                  <span className="text-white/80 text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                    {platform.followers} Followers
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-1">{platform.name}</h3>
                <p className="text-white/70 text-sm mb-3">{platform.handle}</p>
                <p className="text-white/60 text-sm">{platform.description}</p>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">Follow Us</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* Decorative circle */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full"></div>
            </a>
          ))}
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white/70 border border-peach/40 px-8 py-4 rounded-full">
            <div className="flex -space-x-3">
              <span className="w-10 h-10 bg-soft-pink rounded-full flex items-center justify-center text-lg border-2 border-white">🐻</span>
              <span className="w-10 h-10 bg-peach rounded-full flex items-center justify-center text-lg border-2 border-white">💕</span>
              <span className="w-10 h-10 bg-soft-pink rounded-full flex items-center justify-center text-lg border-2 border-white">🎀</span>
              <span className="w-10 h-10 bg-peach rounded-full flex items-center justify-center text-lg border-2 border-white">✨</span>
            </div>
            <p className="text-primary font-medium">
              Join <span className="text-ribbon-red font-bold">500K+</span> followers across all platforms
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
