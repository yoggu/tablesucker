import Link from "next/link";

export default function Menu() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/" className="text-blue-800 dark:text-green-500">Live</Link>
        </li>
        <li>
          <Link href="/players">Players</Link>
        </li>
        <li>
          <Link href="/seasons">Seasons</Link>
        </li>
        </ul>
    </nav>
  )
}
