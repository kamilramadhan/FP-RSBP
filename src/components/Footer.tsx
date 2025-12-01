import Image from "next/image";

export function Footer() {
  return (
    <>
      {/* Wavy SVG top border - outside footer */}
      <svg
        className="w-full"
        viewBox="0 0 1000 58"
        preserveAspectRatio="none"
        style={{ height: "70px", display: "block" }}
      >
        <defs>
          <style>{`
            @keyframes wave-animation {
              0% { transform: translateX(0); }
              50% { transform: translateX(-120px); }
              100% { transform: translateX(0); }
            }
            .wave-path {
              animation: wave-animation 4s ease-in-out infinite;
            }
          `}</style>
        </defs>
        <path
          className="wave-path"
          d="M0,40 Q300,0 600,40 T1200,40 L1200,59 L0,59 Z"
          fill="#FF6900"
        />
      </svg>

      <footer className="bg-orange-500 pb-36 px-4">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 pt-12">
          <div className="flex items-center gap-2">
            <Image
              src="/images/footer-logo kulitmu.svg"
              alt="Kulitmu Logo"
              width={32}
              height={32}
              priority
            />
            <span className="text-xl font-bold text-white">KULITMU</span>
          </div>

          <div className="text-center md:text-left text-white/90 text-sm">
            <p className="font-semibold mb-2">Sistem Pakar untuk membaca bahasa kulit wajahmu</p>
            <p>Menggunakan algoritma Certainty Factor untuk rekomendasi yang personal dan akurat</p>
          </div>

          <div className="text-white/80 text-sm text-center md:text-right">
            <p>© 2025 Kulitmu</p>
            <p className="text-white/60">Author: Kelompok 7 - RSBP (C)</p>
          </div>
        </div>
      </footer>
    </>
  );
}
