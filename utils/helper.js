export const dateConvert = (createdAt) => {
  const orderDate = new Date(createdAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };

  const formattedDate = orderDate.toLocaleDateString("en-US", options);

  return formattedDate;
};

export const ratingCalc = (feedbacks) => {
  const feedbackCountCalc = feedbacks.length;
  const reviewsCountCalc = feedbacks.filter((feedback) => feedback.feedbackDesc !== "").length;
  const totalRatingCalc = feedbacks.reduce(
    (acc, feedback) => acc + feedback.rating,
    0
  );
  const avgRatingCalc = (totalRatingCalc / feedbackCountCalc || 0).toFixed(1);
  return { feedbackCountCalc, reviewsCountCalc, avgRatingCalc };
};

export const starsCalc = (avgRating, feedbacks) => {
  const filledStarsCalc = Math.floor(avgRating);
  const hasHalfStarCalc = avgRating - filledStarsCalc >= 0.5;
  const halfStarCalc = hasHalfStarCalc ? 1 : 0;
  const emptyStarsCalc = 5 - filledStarsCalc - halfStarCalc;

  const ratingDataCalc = feedbacks.reduce((acc, feedback) => {
    const rating = feedback.rating;
    if (!acc[rating]) {
      acc[rating] = 0;
    }
    acc[rating]++;
    return acc;
  }, {});

  const updatedRatingsCalc = Array.from({ length: 5 }, (_, index) => {
    const stars = index + 1;
    return {
      stars,
      count: ratingDataCalc[stars] || 0,
    };
  }).reverse();

  return {filledStarsCalc, hasHalfStarCalc, emptyStarsCalc, updatedRatingsCalc};
}
