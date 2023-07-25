import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInOut } from '../animations'

const LoginInput = ({
  placeholder,
  icon,
  inputState,
  inputStateFunction,
  type,
  isSignUp,
}) => {
  const [isFocus, setIsFocus] = useState(false)

  return (
    <motion.div
      {...fadeInOut}
      className={`flex items-center justify-center gap-4 bg-white backdrop-blur-md rounded-md w-full px-4 py-2 ${
        isFocus ? 'shadow-md shadow-red-400' : 'shadow-none'
      }`}
    >
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-full bg-transparent outline-none text-headingColor text-lg font-semibold border-none"
        value={inputState}
        onChange={(e) => inputStateFunction(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </motion.div>
  )
}

export default LoginInput
