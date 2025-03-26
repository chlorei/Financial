
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Statistics', href: '/stats' },
  { label: 'Settings', href: '/settings' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="w-full bg-gray-800 text-white px-6 py-3 shadow-md flex gap-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={clsx(
            'transition hover:text-blue-300 font-medium',
            pathname === item.href ? 'text-blue-400 underline' : 'text-white'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}