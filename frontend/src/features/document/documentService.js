import axios from "axios"

const BASE_URL = "/documents"

// Get documents for a transaction
const getDocuments = async (model, id, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    
      const response = await axios.get(`BASE_URL/${model}/${id}`, config)
    
      return response.data
}

// Set document for a transaction
const setDocument = async (formData, token) => {
  const res = await axios.post(BASE_URL + "/login", userData)

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data))
  }

  return res.data
}

// Update document
const updateDocument = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await axios.put(BASE_URL, userData, config)

  return res.data
}

// Delete document
const deleteDocument = async (docId, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    
      const response = await axios.delete(BASE_URL + `/${docId}`, config)
    
      return response.data
}

const documentService = {
    getDocuments,
    setDocument,
    updateDocument,
    deleteDocument,
}

export default documentService
