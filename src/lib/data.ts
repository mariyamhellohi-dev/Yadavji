export type Game = {
  id: string
  name: string
  result: string
  status: 'Betting is Closed' | 'Betting is Running' | 'Betting Running For Close'
  timing: {
    openBidEnds: string
    closeBidEnds: string
    openResult: string
    closeResult: string
  }
}

export const games: Game[] = [
  { id: '1', name: 'MAIN BAZAR DAY', result: '***-**-***', status: 'Betting is Running', timing: { openBidEnds: '03:30 PM', closeBidEnds: '05:30 PM', openResult: '05:30 PM', closeResult: '05:35 PM' } },
  { id: '2', name: 'MAIN MUMBAI NIGHT', result: '***-**-***', status: 'Betting is Running', timing: { openBidEnds: '09:00 PM', closeBidEnds: '11:00 PM', openResult: '09:05 PM', closeResult: '11:05 PM' } },
  { id: '3', name: 'MAIN MUMBAI RK', result: '***-**-***', status: 'Betting is Running', timing: { openBidEnds: '09:30 PM', closeBidEnds: '11:50 PM', openResult: '09:35 PM', closeResult: '11:55 PM' } },
  { id: '4', name: 'RATAN KHATRI', result: '***-**-***', status: 'Betting is Running', timing: { openBidEnds: '09:40 PM', closeBidEnds: '11:40 PM', openResult: '09:45 PM', closeResult: '12:05 AM' } },
  { id: '5', name: 'SRIDEVI MORNING', result: '***-**-***', status: 'Betting is Running', timing: { openBidEnds: '10:00 PM', closeBidEnds: '11:00 PM', openResult: '10:05 PM', closeResult: '10:35 AM' } },
  { id: '6', name: 'OLD MAIN MUMBAI', result: '***-**-***', status: 'Betting is Running', timing: { openBidEnds: '09:30 PM', closeBidEnds: '11:30 PM', openResult: '09:35 PM', closeResult: '11:35 PM' } },
  { id: '7', name: 'BOMBAY NIGHT', result: '***-**-***', status: 'Betting is Running', timing: { openBidEnds: '09:35 PM', closeBidEnds: '11:55 PM', openResult: '09:40 PM', closeResult: '11:58 PM' } },
  { id: '8', name: 'KALYAN MORNING', result: '680-45-357', status: 'Betting is Running', timing: { openBidEnds: '11:35 AM', closeBidEnds: '12:35 PM', openResult: '11:40 AM', closeResult: '12:40 PM' } },
  { id: '9', name: 'TIME BAZAR', result: '468-86-259', status: 'Betting is Running', timing: { openBidEnds: '12:55 PM', closeBidEnds: '01:55 PM', openResult: '01:00 PM', closeResult: '02:00 PM' } },
  { id: '10', name: 'MILAN DAY', result: '599-30-460', status: 'Betting is Running', timing: { openBidEnds: '03:05 PM', closeBidEnds: '05:05 PM', openResult: '03:10 PM', closeResult: '05:10 PM' } },
  { id: '11', name: 'RAJDHANI DAY', result: '170-84-130', status: 'Betting is Running', timing: { openBidEnds: '02:55 PM', closeBidEnds: '04:55 PM', openResult: '03:00 PM', closeResult: '05:00 PM' } },
  { id: '12', name: 'KALYAN', result: '279-82-138', status: 'Betting is Running', timing: { openBidEnds: '04:10 PM', closeBidEnds: '06:10 PM', openResult: '04:15 PM', closeResult: '06:15 PM' } },
  { id: '13', name: 'MILAN NIGHT', result: '334-00-127', status: 'Betting is Running', timing: { openBidEnds: '09:00 PM', closeBidEnds: '11:00 PM', openResult: '09:10 PM', closeResult: '11:00 PM' } },
  { id: '14', name: 'RAJDHANI NIGHT', result: '570-20-677', status: 'Betting is Running', timing: { openBidEnds: '09:35 PM', closeBidEnds: '11:35 PM', openResult: '09:40 PM', closeResult: '11:40 PM' } },
  { id: '15', name: 'KALYAN NIGHT', result: '356-40-244', status: 'Betting is Running', timing: { openBidEnds: '09:35 PM', closeBidEnds: '11:35 PM', openResult: '09:40 PM', closeResult: '11:40 PM' } },
  { id: '16', name: 'MAIN BAZAR', result: '899-6*-***', status: 'Betting is Running', timing: { openBidEnds: '09:55 PM', closeBidEnds: '11:55 PM', openResult: '10:00 PM', closeResult: '12:00 AM' } },
]
