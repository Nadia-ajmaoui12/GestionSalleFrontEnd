interface Spot {
  level: string;
  ref: string;
  eco: boolean;
  description: string;
  type: 'DESK' | 'PHONEBOOTH' | 'MEETINGROOM';
  personNumber: number;
}

const emptySpot: Spot = {
  level: '',
  ref: '',
  eco: false,
  description: '',
  type: 'DESK',
  personNumber: 1,
};

export { Spot, emptySpot };
