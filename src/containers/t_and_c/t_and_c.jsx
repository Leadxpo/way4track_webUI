import axios from "axios"
import { useState, useEffect } from "react"

const TermsAndConditions = () => {
  const [terms, setTerms] = useState("")
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://sharontelematics.org/api/terms_and_condition/getAllTermsAndCondition"
        )

        const first = res.data?.[0]
        setTerms(first?.termsAndCondition || "")
        setPreview(first?.image || null)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    setImage(file)
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
    }


  const handleSubmit = async () => {
  try {
    let base64Image = null

    if (image) {
      base64Image = await convertToBase64(image)
    }

    const payload = {
      id: 1,
      termsAndCondition: terms,
      image: base64Image, // OR null if no image
      companyCode: "COMP001",
      unitCode: "UNIT100",
    }

    console.log("PAYLOAD:", payload)

    await axios.post(
      "https://sharontelematics.org/api/terms_and_condition/handleTermsAndCondition",
      payload,
      { headers: { "Content-Type": "application/json" } }
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
    <div className="w-full max-w-lg mx-auto mt-8 p-6 bg-white shadow rounded">
      <h1 className="text-lg font-semibold mb-4">Terms & Conditions</h1>

      {/* Terms Input */}
      <label className="block text-sm font-medium mb-2">
        Terms and Conditions
      </label>
      <textarea
        className="w-full border rounded px-3 py-2 text-sm h-32 resize focus:outline-none focus:ring focus:border-blue-400"
        value={terms}
        onChange={(e) => setTerms(e.target.value)}
      ></textarea>

      {/* Image Upload */}
      <label className="block text-sm font-medium mt-4 mb-2">
        Upload Image (optional)
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="w-full text-sm"
      />

      {/* Image Preview */}
      {preview && (
        <div className="mt-4">
          <p className="text-sm mb-1">Preview:</p>
          <img
            src={preview}
            alt="preview"
            className="w-full max-h-60 object-contain border rounded"
          />
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
      >
        Update
      </button>
    </div>
  )
}

export default TermsAndConditions
