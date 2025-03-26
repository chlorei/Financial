import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { from, to } = req.query

  if (!from || !to || typeof from !== 'string' || typeof to !== 'string') {
    return res.status(400).json({ error: 'Missing "from" or "to" parameters' })
  }

  try {
    const response = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.toLowerCase()}.json`
    )
    const data = await response.json()
    const rate = data[from.toLowerCase()][to.toLowerCase()]

    if (!rate) {
      return res.status(404).json({ error: 'Rate not found' })
    }

    res.status(200).json({ rate })
  } catch (error) {
    res.status(500).json({ error: 'Error fetching currency data' })
  }
}