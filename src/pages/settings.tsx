import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { AppDispatch } from '@/store'
import { setBaseCurrency } from '../store/settingsReducer'

const currencies = ['USD', 'EUR', 'RUB', 'KZT', 'GBP']

export default function SettingsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const baseCurrency = useSelector((state: RootState) => state.settings.baseCurrency)

  const [selected, setSelected] = useState(baseCurrency)

  useEffect(() => {
    setSelected(baseCurrency)
  }, [baseCurrency])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelected(value)
    dispatch(setBaseCurrency(value))
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <label className="block mb-2 text-gray-700 font-medium">Root Currency</label>
        <select
          value={selected}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
      </div>
    </div>
  )
}