import { Link, useNavigate } from 'react-router-dom';
import { typeCard } from '../../types';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { capitalizedWord } from '../../utils/utils';
import { useAppDispatch } from '../../store/helpers';
import { changeFavoriteStatus } from '../../store/thunk/offers';
import { memo, useState } from 'react';
import { useAuth } from '../../hooks/use-auth';

type cardProps = {
  card: typeCard;
}

const CardNearPlace = memo(({ card }: cardProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorized = useAuth() === AuthorizationStatus.Auth;
  const [isFavorite, setIsFavorite] = useState(card.isFavorite);
  const {id,isPremium,previewImage,price,rating,title,type} = card;
  const favoriteStatus = isFavorite ? 0 : 1;

  const handleChangeFavorite = () => {
    if(!isAuthorized){
      navigate(AppRoute.Login);
      return;
    }
    const payload = {
      offerId: id,
      status: favoriteStatus
    };

    dispatch(changeFavoriteStatus(payload)).unwrap().then(()=>{
      setIsFavorite(!isFavorite);
    });
  };

  return(
    <article className="near-places__card place-card">
      {isPremium &&
        <div className="place-card__mark">
          {<span>Premium</span>}
        </div>}
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={handleChangeFavorite} className={`place-card__bookmark-button ${isFavorite && 'place-card__bookmark-button--active'} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizedWord(type)}</p>
      </div>
    </article>
  );

});

CardNearPlace.displayName = 'CardNearPlace';

export default CardNearPlace;
