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

export const pannaDigits: Record<string, string[]> = {
    'Panna of ank 0': ['127', '136', '145', '190', '235', '280', '370', '389', '460', '479', '569', '578'],
    'Panna of ank 1': ['128', '137', '146', '236', '245', '290', '380', '470', '489', '560', '579', '678'],
    'Panna of ank 2': ['129', '138', '147', '156', '237', '246', '345', '390', '480', '570', '589', '679'],
    'Panna of ank 3': ['120', '139', '148', '157', '238', '247', '256', '346', '490', '580', '670', '689'],
    'Panna of ank 4': ['130', '149', '158', '167', '239', '248', '257', '347', '356', '590', '680', '789'],
    'Panna of ank 5': ['140', '159', '168', '230', '249', '258', '267', '348', '357', '456', '690', '780'],
    'Panna of ank 6': ['123', '150', '169', '178', '240', '259', '268', '349', '358', '367', '457', '790'],
    'Panna of ank 7': ['124', '160', '179', '250', '269', '278', '340', '359', '368', '458', '467', '890'],
    'Panna of ank 8': ['125', '134', '170', '189', '260', '279', '350', '369', '378', '459', '468', '567'],
    'Panna of ank 9': ['126', '135', '180', '234', '270', '289', '360', '379', '450', '469', '478', '568'],
};

export const doublePannaDigits: Record<string, string[]> = {
    'Panna of ank 0': ['118', '226', '244', '299', '334', '488', '550', '668', '677'],
    'Panna of ank 1': ['100', '119', '155', '227', '335', '344', '399', '588', '669'],
    'Panna of ank 2': ['110', '200', '228', '255', '336', '499', '660', '688', '778'],
    'Panna of ank 3': ['166', '229', '300', '337', '355', '445', '599', '779', '788'],
    'Panna of ank 4': ['112', '220', '266', '338', '400', '446', '455', '699', '770'],
    'Panna of ank 5': ['113', '122', '177', '339', '366', '447', '500', '799', '889'],
    'Panna of ank 6': ['114', '277', '330', '448', '466', '556', '600', '880', '899'],
    'Panna of ank 7': ['115', '133', '188', '223', '377', '449', '557', '566', '700'],
    'Panna of ank 8': ['116', '224', '233', '288', '440', '477', '558', '800', '990'],
    'Panna of ank 9': ['117', '144', '199', '225', '388', '559', '577', '667', '900'],
};

export const triplePattiDigits = ['000', '111', '222', '333', '444', '555', '666', '777', '888', '999'];
