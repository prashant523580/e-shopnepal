import React from 'react'

export default function Success() {
  return (
    <div><form action="https://uat.esewa.com.np/epay/transrec" method="GET">
    <input value="100" name="amt" type="hidden"/>
    <input value="EPAYTEST" name="scd" type="hidden"/>
    <input value="ee2c3ca1-696b-4cc5-a6be-2c40d929d455" name="pid" type="hidden"/>
    <input value="000AE01" name="rid" type="hidden"/>
    <input value="check" type="submit"/>
    </form></div>
  )
}
