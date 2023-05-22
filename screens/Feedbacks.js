import { ScrollView } from 'react-native'
import React from 'react'
import FeedbackSection from '../components/FeedbackSection'
import AppBar from '../components/AppBar'
import { SafeAreaView } from 'react-native-safe-area-context'

const Feedbacks = ({route}) => {

  const { params: { feedbacksData : { feedbacks, ratings, avgRating, reviewsCount, feedbackCount }, stars : { filledStars, emptyStars, hasHalfStar } } } = route

  return (
    <SafeAreaView className="flex-1 bg-white">
      <AppBar title="Feedbacks"/>
      <FeedbackSection feedbacksData={{feedbacks, ratings, avgRating, reviewsCount, feedbackCount}} stars={{filledStars, emptyStars, hasHalfStar}} />
    </SafeAreaView>
  )
}

export default Feedbacks