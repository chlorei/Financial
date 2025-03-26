import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useMemo } from 'react'

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#6366f1', '#14b8a6']

export default function StatsPage() {
  const transactions = useSelector((state: RootState) => state.card.cardCollection)

  const incomeCategories = ['Salary', 'Accepted']

  const statsData = useMemo(() => {
    const categoryTotals: Record<string, number> = {}
    let totalIncome = 0
    let totalExpense = 0

    transactions.forEach((tx) => {
      const isIncome = incomeCategories.includes(tx.category)
      const amount = Math.abs(tx.amount)

      if (!categoryTotals[tx.category]) {
        categoryTotals[tx.category] = 0
      }

      categoryTotals[tx.category] += amount

      if (isIncome) {
        totalIncome += amount
      } else {
        totalExpense += amount
      }
    })

    const chartData = Object.entries(categoryTotals).map(([category, value]) => ({
      name: category,
      value,
    }))

    return { chartData, totalIncome, totalExpense }
  }, [transactions])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Category stats</h1>

      <div className="bg-white p-6 rounded-lg shadow w-full max-w-2xl mb-8">
        <h2 className="text-xl font-semibold mb-2 text-green-600">Income: {statsData.totalIncome.toFixed(2)}</h2>
        <h2 className="text-xl font-semibold text-red-500">Expences: {statsData.totalExpense.toFixed(2)}</h2>
      </div>

      <div className="w-full max-w-2xl h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statsData.chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {statsData.chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}