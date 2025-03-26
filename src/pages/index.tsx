'use client'

import Transaction from "@/components/AddTransaction/AddTransaction"
import FinancialCard from "@/components/FinancialCard/FinancialCard"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { TransactionCardProps } from "../types/types"
import { useEffect, useState } from "react"

export default function PageContainer() {
  const cardCollection = useSelector((state: RootState) => state.card.cardCollection)
  const baseCurrency = useSelector((state: RootState) => state.settings.baseCurrency)

  const [convertedTransactions, setConvertedTransactions] = useState<TransactionCardProps[]>([])
  const [convertedTotal, setConvertedTotal] = useState<number | null>(null)

  useEffect(() => {
    const convertAll = async () => {
      let total = 0
      const incomeTypes = ['Salary', 'Accepted']

      const updated: TransactionCardProps[] = []

      for (const tx of cardCollection) {
        let rate = 1

        if (tx.currency !== baseCurrency) {
          try {
            const res = await fetch(`/api/convert?from=${tx.currency}&to=${baseCurrency}`)
            const data = await res.json()
            rate = data.rate || 1
          } catch {
            rate = 1
          }
        }

        const convertedAmount = tx.amount * rate
        const isIncome = incomeTypes.includes(tx.category)
        total += isIncome ? convertedAmount : -convertedAmount

        updated.push({
          ...tx,
          convertedAmount: convertedAmount,
        })
      }

      setConvertedTransactions(updated)
      setConvertedTotal(total)
    }

    convertAll()
  }, [cardCollection, baseCurrency])

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center pt-8 px-6">
      <div className="mb-4">
        <Transaction />
      </div>

      <div className="mb-4 text-center w-full max-w-3xl">
        <p className="text-2xl font-bold text-gray-800">Total Balance</p>
        <p className="text-4xl font-extrabold text-blue-700">
          {convertedTotal !== null ? convertedTotal.toFixed(2) : 'Loading...'} {baseCurrency}
        </p>
      </div>

      <div
        className="w-full max-w-3xl flex-grow overflow-y-auto space-y-4 pb-6"
        style={{ maxHeight: 'calc(100vh - 250px)' }}
      >
        {convertedTransactions.map((card) => (
          <FinancialCard
            key={card.id}
            id={card.id}
            name={card.name}
            amount={card.amount}
            currency={card.currency}
            category={card.category}
            date={card.date}
            convertedAmount={card.convertedAmount}
            baseCurrency={baseCurrency}
          />
        ))}
      </div>
    </div>
  )
}