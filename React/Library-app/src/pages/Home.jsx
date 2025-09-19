import React from 'react'

import Landing from '../components/Landing'
import Highlights from '../components/Highlights';
import FeaturedBooks from '../components/FeaturedBooks';
import DiscountBooks from '../components/DiscountBooks'
import ExploreMore from '../components/ExploreMore';

export default function Home() {
  return (
    <div>
        <Landing />
        <Highlights />
        <FeaturedBooks />
        <DiscountBooks />
        <ExploreMore />
    </div>
  )
}
