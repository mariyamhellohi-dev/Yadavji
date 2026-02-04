export type Game = {
  id: string
  name: string
  result: string
  status: 'Open' | 'Closed'
}

export const games: Game[] = [
  { id: '1', name: 'TIME BAZAR', result: '123-69-450', status: 'Open' },
  { id: '2', name: 'MADHUR DAY', result: '489-13-670', status: 'Closed' },
  { id: '3', name: 'MILAN DAY', result: '340-78-134', status: 'Open' },
  { id: '4', name: 'KALYAN', result: '167-46-240', status: 'Closed' },
  { id: '5', name: 'SRIDEVI NIGHT', result: '369-80-127', status: 'Open' },
  { id: '6', name: 'MILAN NIGHT', result: '569-05-230', status: 'Closed' },
  { id: '7', name: 'RAJDHANI NIGHT', result: '248-41-579', status: 'Open' },
  { id: '8', name: 'MAIN BAZAR', result: '235-09-360', status: 'Closed' },
  { id: '9', name: 'KALYAN NIGHT', result: '***-**-***', status: 'Open' },
  { id: '10', name: 'MADHUR NIGHT', result: '115-71-380', status: 'Closed' },
]
