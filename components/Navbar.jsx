'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
    const pathname = usePathname()

    return (
        <section className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-2xl">
            <div className="p-6 border-b border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg"></div>
                    <h1 className="text-2xl font-bold">DACOMP</h1>
                </div>
            </div>

            <nav className="flex-1 py-6">
                <Link
                    href="/user"
                    className={`flex items-center gap-3 px-6 py-3 transition-all hover:bg-gray-700 ${pathname === '/user' ? 'bg-blue-600 border-r-4 border-blue-400' : ''}`}
                >
                    <i className="fa-regular fa-user text-xl"></i>
                    <span className="font-medium">Usuário</span>
                </Link>

                <Link
                    href="/generator"
                    className={`flex items-center gap-3 px-6 py-3 transition-all hover:bg-gray-700 ${pathname === '/generator' ? 'bg-blue-600 border-r-4 border-blue-400' : ''}`}
                >
                    <i className="fa-regular fa-rectangle-list text-xl"></i>
                    <span className="font-medium">Gerador</span>
                </Link>

                <Link
                    href="/database"
                    className={`flex items-center gap-3 px-6 py-3 transition-all hover:bg-gray-700 ${pathname === '/database' ? 'bg-blue-600 border-r-4 border-blue-400' : ''}`}
                >
                    <i className="fa-regular fa-id-card text-xl"></i>
                    <span className="font-medium">Carteirinhas</span>
                </Link>
            </nav>

            <div className="p-6 border-t border-gray-700 text-sm text-gray-400">
                <span className="block mb-2">Desenvolvido por</span>
                <a
                    href="https://github.com/mateusmcamargo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                    <i className="fa-brands fa-github"></i>
                    <span>mateusmcamargo</span>
                </a>
            </div>
        </section>
    )
}
