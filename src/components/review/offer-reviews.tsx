import ReviewList from './reviews-list';
import { AuthorizationStatus } from '../../constants';
import { typeComment } from '../../types';
import ReviewsForm from './form-reviews';
import { useAuth } from '../../hooks/use-auth';
import { FC } from 'react';

const OfferReviews: FC<{comments: typeComment[]}> = ({comments}) => {

  const isAuth = useAuth();

  return(
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ReviewList comments={comments}/>
      {isAuth === AuthorizationStatus.Auth && <ReviewsForm />}
    </section>
  );

};

export default OfferReviews;

