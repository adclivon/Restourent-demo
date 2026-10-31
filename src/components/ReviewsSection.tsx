import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, X, Heart, ThumbsUp } from 'lucide-react';
import { CUSTOMER_REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';
import { CustomerReview } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(CUSTOMER_REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [favoriteDish, setFavoriteDish] = useState('Peshawari Shinwari Mutton Karahi');
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      location: location.trim() || 'Lahore, Pakistan',
      rating,
      date: 'Just now',
      comment: comment.trim(),
      favoriteDish,
      verifiedVisit: true,
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewModal(false);
      setAuthor('');
      setLocation('');
      setComment('');
    }, 1200);
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-stone-950 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Proof Metrics Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              Guest Testimonials & Feedback
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight text-balance">
              Cherished by Generations of Food Lovers
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-stone-900 border border-stone-800 p-4 rounded-2xl shrink-0">
            <div className="flex flex-col items-center justify-center pr-4 border-r border-stone-800">
              <span className="text-3xl font-bold text-white tabular-nums">4.9</span>
              <div className="flex items-center text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-white">
                Over 2,840+ Verified Reviews
              </p>
              <p className="text-[11px] text-stone-400">
                Google Maps, FoodPanda & Dine-in Guests
              </p>
              <button
                onClick={() => setShowReviewModal(true)}
                className="mt-2 text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Write a Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:border-stone-700 transition-all hover:-translate-y-1"
            >
              <div>
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed mb-4 italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-stone-800/80">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{rev.author}</span>
                      {rev.verifiedVisit && (
                        <span title="Verified Diner">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-stone-400">{rev.location}</p>
                  </div>
                </div>

                <div className="mt-2 text-[11px] text-amber-400/90 font-medium truncate">
                  Ordered: {rev.favoriteDish}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm"
            onClick={() => setShowReviewModal(false)}
          />

          <div className="relative z-10 w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden p-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-white">Share Your Dining Experience</h3>
                <p className="text-xs text-stone-400">Tell us what you loved at Food Palace</p>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="font-heading text-xl font-bold text-white mb-1">Shukriya! Thank You!</h4>
                <p className="text-xs text-stone-300">Your review has been published to our guest board.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    Your Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Fatima Ali"
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Gulberg, Lahore"
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-stone-600 hover:text-amber-400 transition-colors"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'text-amber-400 fill-amber-400' : 'text-stone-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-400 ml-2">{rating} / 5 Stars</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    Favorite Dish Enjoyed
                  </label>
                  <select
                    value={favoriteDish}
                    onChange={(e) => setFavoriteDish(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Special Royal Mutton Dum Biryani">Special Royal Mutton Dum Biryani</option>
                    <option value="Peshawari Shinwari Mutton Karahi">Peshawari Shinwari Mutton Karahi</option>
                    <option value="Grand Mixed BBQ Platter">Grand Mixed BBQ Platter</option>
                    <option value="Delhi Shahi Beef Shank Nihari">Delhi Shahi Beef Shank Nihari</option>
                    <option value="Palace Makhni White Chicken Karahi">Palace Makhni White Chicken Karahi</option>
                    <option value="Velvet Chicken Malai Boti">Velvet Chicken Malai Boti</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-300 block mb-1">
                    Your Review / Comments <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe the aroma, taste, service, or ambiance..."
                    className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-lg text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer"
                >
                  Publish Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
