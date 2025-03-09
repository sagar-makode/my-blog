import React, { useState } from 'react'
import BiodataForm from './BiodataForm'
import TopCards from '../components/TopCards'

function LandingPage() {
    const [selectedTemplateid, setSelectedTemplateid] = useState(sessionStorage.getItem('selectedTemplateid')) // State to hold selected template
  
  return (
    <div>
        <TopCards setSelectedTemplateid={setSelectedTemplateid} selectedTemplateid={selectedTemplateid}/>
        <BiodataForm selectedTemplateid={selectedTemplateid}/>
    </div>
  )
}

export default LandingPage