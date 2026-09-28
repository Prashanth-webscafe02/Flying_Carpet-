import { MessageCircle } from 'lucide-react'
import { whatsapp } from './data'

// Floating "chat with a specialist" button shared by the destinations pages.
export default function ChatFab({ text = 'Hi! I have a question about Flying Carpet destinations.' }: { text?: string }) {
  return (
    <a
      href={whatsapp(text)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with a destination specialist"
      className="glass-orange fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full transition-transform duration-300 hover:scale-105 md:bottom-8 md:right-8"
    >
      <MessageCircle className="size-6" />
    </a>
  )
}
