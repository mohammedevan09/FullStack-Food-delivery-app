import React from 'react'
import {
  FaFacebook,
  FaInstagramSquare,
  FaTwitter,
  FaGithub,
} from 'react-icons/fa'

const Footer = () => {
  return (
    <>
      <footer className="grid items-center justify-center bg-gray-900 w-full text-white py-1">
        <div className="sm:flex grid justify-center sm:justify-between items-center w-screen px-10">
          <div className="my-1 mx-auto h-[240px]">
            <h3 className="font-semibold text-xl sm:py-5 py-2">Social Media</h3>
            <ul>
              <li>
                <FaGithub />{' '}
                <a href="https://github.com/mohammedevan09">GitHub</a>
              </li>
              <li>
                <FaFacebook />{' '}
                <a href="https://www.facebook.com/mohammed.evan09/">Facebook</a>
              </li>
              <li>
                <FaInstagramSquare /> <a href="instagram.com">Instagram</a>
              </li>
              <li>
                <FaTwitter /> <a href="twitter.com">Twitter</a>
              </li>
            </ul>
          </div>
          <div className="my-1 mx-auto h-[240px]">
            <h3 className="font-semibold text-xl sm:py-5 py-2">Contact US</h3>
            <ul>
              <li>
                <a href="#">01xxxxxxxx</a>
              </li>
              <li>
                <a href="#">evan@gmail.com</a>
              </li>
              <li>
                <a href="https://www.facebook.com/mohammed.evan09/">
                  Chat with me?
                </a>
              </li>
            </ul>
          </div>
          <div className="my-1 mx-auto h-[240px]">
            <h3 className="font-semibold text-xl sm:py-5 py-2">Services</h3>
            <ul>
              <li>
                <a href="#">Fastest Response</a>
              </li>
              <li>
                <a href="#">Online Payment</a>
              </li>
              <li>
                <a href="#">24/7 Open</a>
              </li>
              <li>
                <a href="#">Home Delivery</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-xl mt-10 text-center">
          © 2023 Food Delivery App.
        </div>
      </footer>
    </>
  )
}

export default Footer
