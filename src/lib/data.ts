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
  { id: '2', name: 'MAIN MUMBAI NIGHT', result: '***-**-***', status: 'Betting is Running', timing: { openBidEnds: '08:45 PM', closeBidEnds: '10:45 PM', openResult: '10:45 PM', closeResult: '10:50 PM' } },
  { id: '3', name: 'MAIN MUMBAI RK', result: '***-**-***', status: 'Betting is Running', timing: { openBidEnds: '09:35 PM', closeBidEnds: '12:05 AM', openResult: '12:05 AM', closeResult: '12:10 AM' } },
  { id: '4', name: 'RATAN KHATRI', result: '***-**-***', status: 'Betting is Running', timing: { openBidEnds: '10:00 PM', closeBidEnds: '12:00 AM', openResult: '12:00 AM', closeResult: '12:05 AM' } },
  { id: '5', name: 'SRIDEVI MORNING', result: '***-**-***', status: 'Betting is Running', timing: { openBidEnds: '09:30 AM', closeBidEnds: '10:30 AM', openResult: '10:30 AM', closeResult: '10:35 AM' } },
  { id: '6', name: 'OLD MAIN MUMBAI', result: '***-**-***', status: 'Betting is Running', timing: { openBidEnds: '09:30 PM', closeBidEnds: '12:05 AM', openResult: '12:05 AM', closeResult: '12:10 AM' } },
  { id: '7', name: 'BOMBAY NIGHT', result: '***-**-***', status: 'Betting is Running', timing: { openBidEnds: '07:00 PM', closeBidEnds: '09:00 PM', openResult: '09:00 PM', closeResult: '09:05 PM' } },
  { id: '8', name: 'KALYAN MORNING', result: '680-45-357', status: 'Betting is Running', timing: { openBidEnds: '11:00 AM', closeBidEnds: '12:02 PM', openResult: '12:02 PM', closeResult: '12:07 PM' } },
  { id: '9', name: 'TIME BAZAR', result: '468-86-259', status: 'Betting is Running', timing: { openBidEnds: '01:00 PM', closeBidEnds: '02:00 PM', openResult: '02:00 PM', closeResult: '02:05 PM' } },
  { id: '10', name: 'MILAN DAY', result: '599-30-460', status: 'Betting is Running', timing: { openBidEnds: '03:00 PM', closeBidEnds: '05:00 PM', openResult: '05:00 PM', closeResult: '05:05 PM' } },
  { id: '11', name: 'RAJDHANI DAY', result: '170-84-130', status: 'Betting is Running', timing: { openBidEnds: '04:00 PM', closeBidEnds: '06:00 PM', openResult: '06:00 PM', closeResult: '06:05 PM' } },
  { id: '12', name: 'KALYAN', result: '279-82-138', status: 'Betting is Running', timing: { openBidEnds: '04:20 PM', closeBidEnds: '06:20 PM', openResult: '06:20 PM', closeResult: '06:25 PM' } },
  { id: '13', name: 'MILAN NIGHT', result: '334-00-127', status: 'Betting is Running', timing: { openBidEnds: '09:00 PM', closeBidEnds: '11:00 PM', openResult: '11:00 PM', closeResult: '11:05 PM' } },
  { id: '14', name: 'RAJDHANI NIGHT', result: '570-20-677', status: 'Betting is Running', timing: { openBidEnds: '09:25 PM', closeBidEnds: '11:35 PM', openResult: '11:35 PM', closeResult: '11:40 PM' } },
  { id: '15', name: 'KALYAN NIGHT', result: '356-40-244', status: 'Betting is Running', timing: { openBidEnds: '09:25 PM', closeBidEnds: '11:30 PM', openResult: '11:30 PM', closeResult: '11:35 PM' } },
  { id: '16', name: 'MAIN BAZAR', result: '899-6*-***', status: 'Betting is Running', timing: { openBidEnds: '09:40 PM', closeBidEnds: '12:05 AM', openResult: '12:05 AM', closeResult: '12:10 AM' } },
]
