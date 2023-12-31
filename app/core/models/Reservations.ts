interface Reservation {
  spotId: string;
  timeSlot: string;
  reservationDate: string;
}

const emptyReservation: Reservation = {
  spotId: '',
  timeSlot: '',
  reservationDate: '',
};

export { Reservation, emptyReservation };
