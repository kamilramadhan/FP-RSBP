import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/images/navbar-logo kulitmu.svg"
        alt="Kulitmu Logo"
        width={32}
        height={32}
        priority
      />
      <span className="text-xl font-bold text-orange-400">KULITMU</span>
    </div>
  );
}
