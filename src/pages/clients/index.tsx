import { useRouter } from 'next/router'

export default function ListClients() {
  const router = useRouter()

  return (
    <>
      <main>
        <h1>List clients</h1>
        <button type="button" onClick={() => router.push('/clients/create')}>
         Add Client
        </button>
      </main>
    </>
  )
}
