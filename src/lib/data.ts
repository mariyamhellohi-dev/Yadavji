export type Game = {
  id: string
  name: string
  result: string
  status: 'Betting is Closed' | 'Betting is Running' | 'Betting Running For Close'
}

export const games: Game[] = [
  { id: '1', name: 'MAIN BAZAR DAY', result: '***-**-***', status: 'Betting is Running' },
  { id: '2', name: 'MAIN MUMBAI NIGHT', result: '***-**-***', status: 'Betting is Running' },
  { id: '3', name: 'MAIN MUMBAI RK', result: '***-**-***', status: 'Betting is Running' },
  { id: '4', name: 'RATAN KHATRI', result: '***-**-***', status: 'Betting is Running' },
  { id: '5', name: 'SRIDEVI MORNING', result: '***-**-***', status: 'Betting is Running' },
  { id: '6', name: 'OLD MAIN MUMBAI', result: '***-**-***', status: 'Betting is Running' },
  { id: '7', name: 'BOMBAY NIGHT', result: '***-**-***', status: 'Betting is Running' },
  { id: '8', name: 'KALYAN MORNING', result: '680-45-357', status: 'Betting is Running' },
  { id: '9', name: 'TIME BAZAR', result: '468-86-259', status: 'Betting is Running' },
  { id: '10', name: 'MILAN DAY', result: '599-30-460', status: 'Betting is Running' },
  { id: '11', name: 'RAJDHANI DAY', result: '170-84-130', status: 'Betting is Running' },
  { id: '12', name: 'KALYAN', result: '279-82-138', status: 'Betting is Running' },
  { id: '13', name: 'MILAN NIGHT', result: '334-00-127', status: 'Betting is Running' },
  { id: '14', name: 'RAJDHANI NIGHT', result: '570-20-677', status: 'Betting is Running' },
  { id: '15', name: 'KALYAN NIGHT', result: '356-40-244', status: 'Betting is Running' },
  { id: '16', name: 'MAIN BAZAR', result: '899-6*-***', status: 'Betting is Running' },
]
