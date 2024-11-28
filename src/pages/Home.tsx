import { useEffect, useState } from 'react'
import BookmarkList from '../components/custom/BookmarkList'
import Features from '../components/Features'
import Hero from '../components/Hero'

const Home = () => {

  const [isExtension, setIsExtension] = useState(false)

  const checkIfExtension = () => {
    const isInExtension = !!(typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id);
    setIsExtension(isInExtension)

    // if (window.location.protocol === 'chrome-extension:') {
    //     setIsChromeProtocol(true)
    // }
  }

  useEffect(() => {
    checkIfExtension()
  }, [])

  return (
    <div>
      {
        isExtension ? (
          <BookmarkList />
        ) : (
          <>
            <Hero />
            <Features />
          </>
        )
      }
    </div>
  )
}

export default Home