import { contactLinks } from '../config/contactLinks'

function WhatsAppButton() {
  return (
    <a
      href={contactLinks.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="white"
        className="h-8 w-8"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.908 15.908 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.35 22.606c-.39 1.1-1.932 2.014-3.168 2.282-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.826-6.798-8.064-7.114-.23-.316-1.932-2.572-1.932-4.904s1.222-3.476 1.656-3.952c.434-.476.948-.596 1.264-.596.316 0 .63.002.906.016.29.014.68-.11 1.064.812.39.94 1.326 3.234 1.442 3.468.116.234.194.508.038.824-.154.316-.232.514-.462.792-.232.278-.488.62-.696.832-.232.234-.474.488-.204.958.27.468 1.202 1.982 2.58 3.212 1.774 1.582 3.268 2.072 3.736 2.306.468.234.742.196 1.014-.118.278-.316 1.182-1.378 1.498-1.852.316-.476.63-.392 1.064-.234.434.156 2.746 1.296 3.216 1.532.468.234.782.352.898.546.116.196.116 1.124-.274 2.224z" />
      </svg>
    </a>
  )
}

export default WhatsAppButton
