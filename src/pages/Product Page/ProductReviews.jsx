import { useState } from "react";

function ProductReviews({ reviews = [] }) {
  const [showMore, setShowMore] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(5);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const toggle = (id) => {
    setShowMore((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleReviews((prev) => prev + 5);
      setIsLoadingMore(false);
    }, 500);
  };

  const getStars = (rating) => {
    const fullStars = "★".repeat(Math.floor(rating)); // full stars
    const emptyStars = "☆".repeat(5 - Math.floor(rating)); // empty stars
    return fullStars + emptyStars;
  };
  const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDay < 1) return "added today";
  if (diffDay === 1) return "added yesterday";
  if (diffDay < 7) return `added ${diffDay} day${diffDay > 1 ? "s" : ""} ago`; // Fixed: removed "days"

  const diffWeek = Math.floor(diffDay / 7);
  if (diffWeek === 1) return "added last week";
  if (diffWeek < 4) return `added ${diffWeek} week${diffWeek > 1 ? "s" : ""} ago`; // Fixed: use diffWeek not diffDay

  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth === 1) return "added last month";
  if (diffMonth < 12) return `added ${diffMonth} month${diffMonth > 1 ? "s" : ""} ago`; // Fixed: use diffMonth not diffDay

  const diffYear = Math.floor(diffMonth / 12);
  if (diffYear === 1) return "added last year";
  return `added ${diffYear} year${diffYear > 1 ? "s" : ""} ago`;
};
  const processedReviews = reviews.map((review) => ({
    ...review,
    stars: getStars(review.rating),
    date: getTimeAgo(review.date || new Date()),
  }));

  const visibleReviewsData = processedReviews.slice(0, visibleReviews);
  const hasMore = visibleReviews < processedReviews.length;

  return (
    <>
      {visibleReviewsData.map((review, index) => {
        const fullText = review?.comment;
        const shortText =
          review?.comment.length > 100
            ? review.comment.slice(0, 100) + "..."
            : review?.comment;
        const isExpanded = showMore[review?.id] || false;
        return (
          <div
            key={index}
            className="px-4 py-4 mx-auto md:mx-0 border-b border-gray-100"
          >
            <div className="flex items-center gap-4">
              {/* <img
              className="h-8 w-8 rounded-full object-cover"
              src={review.img}
              alt={review.name}
            /> */}
              <p className="font-medium border-r border-slate-300 pr-4">
                {review?.reviewerName}
              </p>
              <div className="flex gap-2 items-center">
                <div className="font-medium">{review?.rating.toFixed(1)}</div>
                <div className="text-yellow-400 text-lg">{review?.stars}</div>
              </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row justify-between items-start mt-4 gap-2 md:gap-6">
              {/* Comment */}
              <div className="text-sm flex-1">
                <p className="text-slate-600">
                  {isExpanded ? fullText : shortText}
                </p>
                {review.comment.length > 100 && (
                  <button
                    onClick={() => toggle(review?.id)}
                    className="text-orange-500 mt-1 hover:text-orange-600 cursor-pointer hover:underline"
                  >
                    {isExpanded ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>

              {/* Date */}
              <div className="text-slate-400 text-xs whitespace-nowrap mb-2 md:mb-0">
                {review?.date}
              </div>
            </div>
          </div>
        );
      })}
      {/* View More Button with Loading Spinner */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className="bg-white ring-1 ring-gray-300 hover:ring-0 hover:bg-slate-200 text-black cursor-pointer py-2 px-6 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoadingMore ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              `View More (${reviews.length - visibleReviews} remaining)`
            )}
          </button>
        </div>
      )}

      {/* Show total count */}
      <div className="text-center text-sm text-gray-500 mt-4">
        Showing {visibleReviewsData.length} of {reviews.length} reviews
      </div>
    </>
  );
}

export default ProductReviews;
