

const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); 


router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1, time: 1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({ message: 'Error al obtener las reservas' });
  }
});

module.exports = router;




router.post('/', async (req, res) => {
  try {
    const { classType, date, time, name, email } = req.body;

    // Verificar cuántas reservas hay para esa clase, fecha y hora
    const existingBookings = await Booking.countDocuments({ classType, date, time });

    if (existingBookings >= 20) {
      return res.status(400).json({ message: 'Cupo completo para esta clase' });
    }

    const newBooking = new Booking({ classType, date, time, name, email });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ message: 'Error al crear la reserva' });
  }
});

// GET /bookings/count?classType=Fitness&date=2025-08-07&time=10:00
router.get('/count', async (req, res) => {
  try {
    const { classType, date, time } = req.query;
    const count = await Booking.countDocuments({ classType, date, time });
    res.json({ count });
  } catch (error) {
    console.error('Error al contar reservas:', error);
    res.status(500).json({ message: 'Error al contar las reservas' });
  }
});



// Cancelar un turno por ID
router.delete('/:id', async (req, res) => {
  const result = await Booking.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).send('No encontrado');
  res.send('Eliminado');
});


module.exports = router;
