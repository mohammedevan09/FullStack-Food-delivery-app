import React, { useState } from 'react'
import MainLoader from './MainLoader'
import { LinearProgress } from '@mui/material'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { error, success, warn } from './AlertMessage'
import { useDispatch } from 'react-redux'
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from 'firebase/storage'
import { storage } from '../config/firebase.config'
import { motion } from 'framer-motion'
import { buttonClick } from '../animations'
import { MdDelete } from 'react-icons/md'
import { addNewProduct, getAllProducts } from '../api'
import { setAllProducts } from '../context/reducers/productsReducer'
import { statuses } from '../dummyData/data'

const DashNewItems = () => {
  const dispatch = useDispatch()

  const [itemName, setItemName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(null)
  const [imageDownloadUrl, setImageDownloadUrl] = useState(null)

  const uploadImage = (e) => {
    setIsLoading(true)
    const imageFile = e.target.files[0]
    const storageRef = ref(storage, `/Images/${Date.now()}_${imageFile.name}`)

    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on(
      `state_changed`,
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      },
      (err) => {
        error('There is an error' + err)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadUrl(downloadURL)
          setIsLoading(false)
          setProgress(null)
          success('Image submitted successfully!')
        })
      }
    )
  }

  const deleteImageFromFirebase = () => {
    setIsLoading(true)
    const deleteRef = ref(storage, imageDownloadUrl)
    deleteObject(deleteRef)
      .then(() => {
        success('Image Deleted successfully!')
        setIsLoading(false)
        setImageDownloadUrl(null)
      })
      .catch((err) => {
        error("Can't delete file!")
      })
  }

  const submitNewData = () => {
    const data = {
      product_name: itemName,
      product_category: category,
      product_price: price,
      imageURL: imageDownloadUrl,
    }
    if (
      !category == '' &&
      !itemName == '' &&
      !price == '' &&
      imageDownloadUrl
    ) {
      addNewProduct(data).then((res) => {
        console.log(res)
        success('Item added successfully')
        setImageDownloadUrl(null), setItemName('')
        setPrice('')
        setCategory(null)
      })
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data))
        // console.log(data)
      })
    } else {
      warn('There is a problem!')
    }
  }

  return (
    <div className="flex items-center justify-center flex-col sm:pt-6 sm:px-24 px-6 pt-2 w-full">
      <div className="border border-red-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4 sm:mt-[60px] sm:mb-0 mb-[130px] ">
        <div className="w-full flex items-center justify-center gap-3 flex-wrap my-8 ">
          <b className="sm:text-3xl text-base">Choose category :</b>
          {statuses &&
            statuses?.map((data) => (
              <p
                key={data.id}
                onClick={() => setCategory(data?.category)}
                className={`sm:px-4 px-2 sm:py-3 py-1 rounded-md sm:text-xl text-sm text-white font-semibold cursor-pointer hover:shadow-md border-red-200 border backdrop-blur-md ${
                  data?.category === category
                    ? 'bg-red-200 text-zinc-950'
                    : 'bg-trans'
                }`}
              >
                {data?.title}
              </p>
            ))}
        </div>
        <InputValueField
          type="text"
          placeholder={'Item name here'}
          stateFunc={setItemName}
          stateValue={itemName}
        />
        <InputValueField
          type="number"
          placeholder={'Item price here'}
          stateFunc={setPrice}
          stateValue={price}
        />

        <div className="w-full max-w-xl max-h-[600px] bg-card backdrop-blur-md rounded-md border-2 border-gray-300 cursor-pointer">
          {isLoading ? (
            <>
              <MainLoader />
              <LinearProgress
                variant="determinate"
                value={progress}
                className="mb-4"
              />
            </>
          ) : (
            <>
              {!imageDownloadUrl ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center h-20 sm:h-40 w-full cursor-pointer text-center">
                      <p className="font-bold text-4xl">
                        <FaCloudUploadAlt className="rotate-0" />
                      </p>
                      <p className="text-sm sm:text-lg text-black font-semibold">
                        Click to upload an image
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative max-w-4xl h-full overflow-hidden rounded-md">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      src={imageDownloadUrl}
                      className="w-full h-full object-cover max-w-4xl"
                    />
                    <motion.button
                      {...buttonClick}
                      type="button"
                      className="absolute top-3 right-3 sm:p-3 p-1 rounded-full bg-red-500 sm:text-xl text-sm cursor-pointer outline-none  hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={() => deleteImageFromFirebase(imageDownloadUrl)}
                    >
                      <MdDelete className="-rotate-0 bg-white rounded-md" />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <motion.button
          onClick={submitNewData}
          {...buttonClick}
          className="w-6/12 sm:py-2 py-1 rounded-md text-primary bg-red-400 hover:bg-red-500"
        >
          Save
        </motion.button>
      </div>
    </div>
  )
}

export const InputValueField = ({
  type,
  placeholder,
  stateValue,
  stateFunc,
}) => {
  return (
    <>
      <input
        type={type || 'text'}
        placeholder={placeholder}
        className="w-full sm:px-4 sm:py-3 py-1 px-2 bg-white outline-none rounded-md focus:shadow-sm focus:shadow-red-400 text-black"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  )
}

export default DashNewItems
