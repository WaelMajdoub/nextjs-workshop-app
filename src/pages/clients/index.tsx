import { useRouter } from 'next/router'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ListClients() {
  const router = useRouter()

  return (
    <>
      <main>
        <h1>List clients</h1>
        <Stack spacing={5} direction="row">
            <Button variant="contained" onClick={() => router.push('/clients/create')}>
            Add Client
            </Button>
        </Stack>
      </main>
    </>
  )
}
