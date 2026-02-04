export type Game = {
  id: string
  name: string
  result: string
  status: 'Betting is Closed' | 'Betting is Running' | 'Betting Running For Close'
}

export const games: Game[] = [
  { id: '1', name: 'KALYAN MORNING', result: '680-45-357', status: 'Betting is Closed' },
  { id: '2', name: 'TIME BAZAR', result: '468-86-259', status: 'Betting is Closed' },
  { id: '3', name: 'MILAN DAY', result: '599-3*-***', status: 'Betting Running For Close' },
  { id: '4', name: 'RAJDHANI DAY', result: '170-8*-***', status: 'Betting Running For Close' },
  { id: '5', name: 'KALYAN', result: '***-**-***', status: 'Betting is Running' },
  { id: '6', name: 'MILAN NIGHT', result: '***-**-***', status: 'Betting is Running' },
  { id: '7', name: 'RAJDHANI NIGHT', result: '***-**-***', status: 'Betting is Running' },
  { id: '8', name: 'KALYAN NIGHT', result: '***-**-***', status: 'Betting is Running' },
]
