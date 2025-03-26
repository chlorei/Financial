'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { Input } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FinancialCard } from '../../types/types'
import { AppDispatch } from '@/store'
import { v4 as uuidv4 } from 'uuid'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const currencies = ['USD', 'EUR', 'RUB', 'KZT', 'GBP'] as const
const activities = ['Salary', 'Accepted', 'Sent', 'Invested', 'Shopping', 'Entertaiment'] as const

type Currency = typeof currencies[number]
type Activity = typeof activities[number]

export default function BasicModal() {
  const dispatch = useDispatch<AppDispatch>()

  const [name, setName] = useState('')
  const [amount, setAmount] = useState<string>('')
  const [currency, setCurrency] = useState<Currency | ''>('')
  const [activity, setActivity] = useState<Activity | ''>('')

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)
  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => setCurrency(e.target.value as Currency)
  const handleActivityChange = (e: ChangeEvent<HTMLSelectElement>) => setActivity(e.target.value as Activity)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button
  variant="contained"
  color="primary"
  onClick={handleOpen}
  sx={{
    backgroundColor: '#3b82f6', 
    color: '#fff',
    textTransform: 'none',
    fontWeight: 500,
    px: 4,
    py: 1.5,
    borderRadius: '999px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  }}
>
  Add new transaction
</Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h1 className="text-center text-xl font-semibold mb-4">Add Transaction</h1>

          <Input
            placeholder="Transaction name"
            fullWidth
            value={name}
            onChange={handleNameChange}
            sx={{ mb: 2 }}
          />

          <Input
            placeholder="Amount"
            fullWidth
            value={amount}
            onChange={handleAmountChange}
            sx={{ mb: 4 }}
            type="number"
          />

          <div className="flex flex-col gap-6">
            <div>
              <label className="block mb-2 text-gray-700 font-medium">Currency</label>
              <select
                value={currency}
                onChange={handleCurrencyChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Currency</option>
                {currencies.map((cur) => (
                  <option key={cur} value={cur}>{cur}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-gray-700 font-medium">Activity Type</label>
              <select
                value={activity}
                onChange={handleActivityChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Activity</option>
                {activities.map((act) => (
                  <option key={act} value={act}>{act}</option>
                ))}
              </select>
            </div>
          </div>

          <Button
            variant="contained"
            color="inherit"
            sx={{
              mt: 4,
              backgroundColor: '#1f2937',
              color: '#fff',
              '&:hover': { backgroundColor: '#111827' },
              width: '100%',
              textTransform: 'none',
              fontWeight: 500,
            }}
            onClick={() => {
              if (!name || !amount || !currency || !activity) return

              const newTransaction: FinancialCard = {
                id: uuidv4(),
                name,
                amount: parseFloat(amount),
                currency,
                category: activity,
                date: new Date().toISOString().split('T')[0],
              }

              dispatch({ type: 'ADD_CARD', payload: newTransaction })

              setName('')
              setAmount('')
              setCurrency('')
              setActivity('')
              handleClose()
            }}
          >
            Save Transaction
          </Button>
        </Box>
      </Modal>
    </div>
  )
}