"use client"

import { useBalance } from "@repo/store/useBalance"

export const BalanceCard=()=>{
    const balance=useBalance()
    return <div>
        hi there {balance}
    </div>
}
