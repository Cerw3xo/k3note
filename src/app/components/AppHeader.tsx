import Image from "next/image";

export default function AppHeader() {
  return (
    <header className="bg-white shadow-lg p-2">
      <Image
        src="/images/image.png"
        width={200}
        height={100}
        alt="logo"
      />
    </header>
  );
}
