const axios = require('axios');

const ORS_API_KEY = process.env.ORS_API_KEY;

exports.generatePlan = async (req, res) => {
  const { location, mode, days } = req.body;

  try {
    const geocodeUrl = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(location)}`;
    const geoRes = await axios.get(geocodeUrl);
    const coords = geoRes.data.features[0]?.geometry.coordinates;

    if (!coords) return res.status(400).json({ error: 'Location not found' });


    res.json({
      center: coords.reverse(), // [lat, lon]
      days,
      mode,
      path: [[coords[1], coords[0]], [coords[1]+0.01, coords[0]+0.01]], 
      stops: [
        { day: 1, label: "1", lat: coords[1], lon: coords[0], type: "start" }
      ]
    });

  } catch (err) {
    res.status(500).json({ error: 'Failed to generate plan' });
  }
};
