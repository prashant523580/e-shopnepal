import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Logout() {
  const router = useRouter();
    useEffect(() => {
        localStorage.clear()
        window.location.href = "/"
    },[router.query])
  return (
    <div>Success Fully Logout</div>
  )
}
