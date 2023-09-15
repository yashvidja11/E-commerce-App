import React from 'react'
import Banner from '../components/Banner'
import CategoryList from '../components/CategoryList'
import Wrapper from '../components/Wrapper'
import PopularDeals from '../components/PopularDeals'

const HomePage:React.FC = () => {
  
  return (
  <>
   <Banner/>
   <CategoryList/>
   <PopularDeals/>
   <Wrapper/>
   </>
  )
}

export default HomePage

