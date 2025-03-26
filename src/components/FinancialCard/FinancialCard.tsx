import { TransactionCardProps } from "@/types/types"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store"

const TransactionCard: React.FC<TransactionCardProps> = ({
  name,
  amount,
  currency,
  category,
  date,
  id,
  convertedAmount,
  baseCurrency,
}) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = () => {
    dispatch({ type: "REMOVE_CARD", payload: id })
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-md transition">
      <div>
        <p className="text-lg font-semibold text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{category} • {date ?? 'Сегодня'}</p>
      </div>

      <div className="flex items-end flex-col gap-1 text-right">
        <p className="text-lg font-bold text-blue-600">
          {amount} {currency}
        </p>

        {convertedAmount !== undefined && currency !== baseCurrency && (
          <p className="text-sm text-gray-500 italic">
            ≈ {convertedAmount.toFixed(2)} {baseCurrency}
          </p>
        )}

        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 text-sm transition"
          title="Delete"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TransactionCard