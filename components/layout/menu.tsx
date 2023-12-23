import Link from "next/link";

export default function Menu() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/" className="">Live</Link>
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
