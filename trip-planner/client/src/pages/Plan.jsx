import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import axios from 'axios'

function Plan() {
  const mapRef = useRef(null)
  const routeLayerRef = useRef(null)
  const [locationQuery, setLocationQuery] = useState('')
  const [profile, setProfile] = useState('foot-hiking')
  const [days, setDays] = useState(1)

  useEffect(() => {
    if (mapRef.current) return
    mapRef.current = L.map('map').setView([32.0853, 34.7818], 8)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapRef.current)
  }, [])

  const goToLocation = async () => {
    try {
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery)}`)
      const geoData = await geoRes.json()
      if (!geoData || geoData.length === 0) {
        alert('Location not found')
        return
      }

      const lat = parseFloat(geoData[0].lat)
      const lon = parseFloat(geoData[0].lon)
      mapRef.current.setView([lat, lon], 13)

      const start = [lon, lat]
      const offset = profile.includes('foot') ? 0.01 : 0.3
      const end = [lon + offset, lat + offset]
      const roundtrip = profile === 'foot-hiking'

      const routeRes = await axios.post('http://localhost:3001/api/trip/route', {
        coordinates: [start, end],
        profile,
        roundtrip
      })

      const geojson = routeRes.data
      if (routeLayerRef.current) {
        mapRef.current.removeLayer(routeLayerRef.current)
      }

      routeLayerRef.current = L.geoJSON(geojson).addTo(mapRef.current)
    } catch (err) {
      alert('Failed to fetch route')
    }
  }

  return (
    <div>
      <h2>Plan Your Trip</h2>
      <input
        type="text"
        value={locationQuery}
        onChange={(e) => setLocationQuery(e.target.value)}
        placeholder="Enter city or country"
      />
      <select value={profile} onChange={(e) => setProfile(e.target.value)}>
        <option value="foot-hiking">Hiking</option>
        <option value="cycling-regular">Cycling</option>
      </select>
      <select value={days} onChange={(e) => setDays(parseInt(e.target.value))}>
        <option value="1">1 day</option>
        <option value="2">2 days</option>
        <option value="3">3 days</option>
        <option value="4">4 days</option>
        <option value="5">5+ days</option>
      </select>
      <button onClick={goToLocation}>Go to Location</button>
      <div id="map" style={{ height: '500px', marginTop: '20px' }}></div>
    </div>
  )
}

export default Plan
