import axios from 'axios'

export const baseURL = import.meta.env.VITE_BASE_URL

export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
      headers: { Authorization: 'Bearer ' + token },
    })
    return res?.data?.data
  } catch (error) {
    return null
  }
}

export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/create`, { ...data })
    return res?.data?.data
  } catch (error) {
    return null
  }
}

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/all`)
    return res?.data?.data
  } catch (error) {
    return null
  }
}

export const deleteProducts = async (productId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/delete/${productId}`
    )
    return res?.data?.data
  } catch (error) {
    return null
  }
}

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/all`)
    return res?.data?.data
  } catch (error) {
    return null
  }
}

export const addNewItemToCart = async (user_id, data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/addToCart/${user_id}`,
      { ...data }
    )
    return res?.data?.data
  } catch (error) {
    return null
  }
}

export const deleteFromCart = async (user_id, data) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/deleteFromCart/${user_id}`,
      {
        data: {
          productId: data,
        },
      }
    )
    const deletedItem = res?.data?.data
    return deletedItem
  } catch (error) {
    return null
  }
}

export const getAllCartItems = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/getCartItems/${user_id}`
    )
    return res?.data?.data
  } catch (error) {
    return null
  }
}
