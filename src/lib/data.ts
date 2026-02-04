export type Game = {
  id: string
  name: string
  result: string
  status: 'Betting is Closed' | 'Betting is Running' | 'Betting Running For Close'
}

export const games: Game[] = [
  { id: '1', name: 'MAIN BAZAR DAY', result: '***-**-***', status: 'Betting is Closed' },
  { id: '2', name: 'MAIN MUMBAI NIGHT', result: '***-**-***', status: 'Betting Running For Close' },
  { id: '3', name: 'MAIN MUMBAI RK', result: '***-**-***', status: 'Betting Running For Close' },
  { id: '4', name: 'RATAN KHATRI', result: '***-**-***', status: 'Betting Running For Close' },
  { id: '5', name: 'SRIDEVI MORNING', result: '***-**-***', status: 'Betting Running For Close' },
  { id: '6', name: 'OLD MAIN MUMBAI', result: '***-**-***', status: 'Betting Running For Close' },
  { id: '7', name: 'BOMBAY NIGHT', result: '***-**-***', status: 'Betting is Running' },
  { id: '8', name: 'KALYAN', result: '***-**-***', status: 'Betting is Running' },
]
