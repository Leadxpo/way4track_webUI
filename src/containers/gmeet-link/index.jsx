import axios from "axios"
import { useState, useEffect } from "react"

const GmeetLink = () => {
  const [meetLink, setMeetLink] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://sharontelematics.org/api/google-meet-links/editGoogleMeetLink"
        )

        setMeetLink(res.data?.[0]?.meetLink || "")
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleLink = async () => {
    try {
      const payload = {
        id: 1,
        meetLink,
        companyCode: "WAY4TRACK",
        unitCode: "WAY4",
      }

      await axios.post(
        "https://sharontelematics.org/api/google-meet-links/handleGoogleMeetLink",
        payload
      )

      alert("Updated successfully")
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto mt-10 text-center">
        <div className="inline-block w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-4 bg-white shadow rounded">
      <label className="block text-sm font-medium mb-2">Calendar Link</label>

      <input
        type="text"
        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
        value={meetLink}
        onChange={(e) => setMeetLink(e.target.value)}
      />

      <button
        onClick={handleLink}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
      >
        Update
      </button>
    </div>
  )
}

export default GmeetLink
