"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function Navbar() {
    const pathname = usePathname()

    return (
        <section className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-dacomp-yellow to-dacomp-orange text-black flex flex-col shadow-2xl">
            <div className="p-6 border-b border-dacomp-gray-dark/30">
                <div className="flex items-center gap-3">
                    <Image
                        src="/dacomp.png"
                        alt="DACOMP"
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-lg border border-white/40 bg-white/30 object-contain"
                    />
                    <h1 className="text-2xl font-bold">DACOMP</h1>
                </div>
            </div>

            <nav className="flex-1 py-6">
                <Link
                    href="/user"
                    className={`flex items-center gap-3 px-6 py-3 transition-all hover:bg-black/10 ${pathname === "/user" ? "bg-white/20 border-r-4 border-dacomp-orange" : ""}`}>
                    <i className="fa-regular fa-user text-xl text-dacomp-orange-dark"></i>
                    <span className="font-medium">Usuário</span>
                </Link>

                <Link
                    href="/generator"
                    className={`flex items-center gap-3 px-6 py-3 transition-all hover:bg-black/10 ${pathname === "/generator" ? "bg-white/20 border-r-4 border-dacomp-orange" : ""}`}>
                    <i className="fa-regular fa-rectangle-list text-xl text-dacomp-orange-dark"></i>
                    <span className="font-medium">Gerador</span>
                </Link>

                <Link
                    href="/database"
                    className={`flex items-center gap-3 px-6 py-3 transition-all hover:bg-black/10 ${pathname === "/database" ? "bg-white/20 border-r-4 border-dacomp-orange" : ""}`}>
                    <i className="fa-regular fa-id-card text-xl text-dacomp-orange-dark"></i>
                    <span className="font-medium">Carteirinhas</span>
                </Link>
            </nav>

            <div className="p-6 border-t border-black/10 text-sm text-dacomp-orange-dark">
                <span className="block mb-2">Desenvolvido por</span>
                <div className="flex flex-col gap-2">
                    <a
                        href="https://github.com/mateusmcamargo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-dacomp-orange-dark hover:text-dacomp-orange transition-colors">
                        <i className="fa-brands fa-github"></i>
                        <span>mateusmcamargo</span>
                    </a>

                    <a
                        href="https://github.com/theGUI001"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-dacomp-orange-dark hover:text-dacomp-orange transition-colors">
                        <i className="fa-brands fa-github"></i>
                        <span>theGUI001</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
