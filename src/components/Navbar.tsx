import { useRouter } from 'next/router'

function Navbar() {
  const router = useRouter()


  return (
    <>
      <main>
        <ul>
            <li onClick={() => router.push('/')}>Home</li>
            <li onClick={() => router.push('/login')}>
                Login
            </li>
            <li onClick={() => router.push('/shop')}>Shop</li>
            <li onClick={() => router.push('/clients')}>Client Management</li>
        </ul>
      </main>
    </>
  )
}

export default Navbar