import React, { useEffect } from 'react'

export default function Logout() {
    useEffect(() => {
        localStorage.clear()
        window.location.href = "/"
    },[])
  return (
    <div>Success Fully Logout</div>
  )
}
