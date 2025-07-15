const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/route', async (req, res) => {
  const { coordinates, profile, roundtrip } = req.body;
  const apiKey = process.env.ORS_API_KEY;

  try {
    const response = await axios.post(
      `https://api.openrouteservice.org/v2/directions/${profile}/geojson`,
      { coordinates },
      {
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json',
        },
        params: roundtrip ? { round_trip: true } : {}
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error('Error from OpenRouteService:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch route' });
  }
});

module.exports = router;
