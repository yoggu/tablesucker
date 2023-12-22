import Link from "next/link";

export default function Menu() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/">Live</Link>
        </li>
        <li>
          <Link href="/players">Players</Link>
        </li>
        <li>
          <Link href="/seasons">Seasons</Link>
        </li>
        </ul>
    </div>
  )
}
