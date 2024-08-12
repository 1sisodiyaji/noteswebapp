import React from 'react' 
import { GoogleGeminiEffectDesign } from '../../components/GoogleGeminiEffect'
import { HeroScrollDesign } from '../../components/ScrollDemo'
import { WobbleCardDesign } from '../../components/WoobleCard'

const Home = () => {
  return (
    <>
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950 space-y-12 pb-12">
      <GoogleGeminiEffectDesign/> 
      <HeroScrollDesign title2={'Collaborate & Improve'} title1={'Join groups and enhance your notes together.'} img={'https://res.cloudinary.com/dbqq41bpc/image/upload/v1723419754/codesaarthi/7_tptucc.png'}/>
      <WobbleCardDesign/>
    </div> 
    </>
  )
}

export default Home