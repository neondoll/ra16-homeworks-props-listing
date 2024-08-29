import cn from 'classnames';
import { ListingItem } from "../types/listing-item";

interface ListingProps {
  items: ListingItem[];
}

const levelClassName = (quantity: ListingItem['quantity']): string | undefined => {
  if (!quantity) {
    return undefined;
  }

  if (quantity <= 10) {
    return 'level-low';
  }

  if (quantity <= 20) {
    return 'level-medium';
  }

  return 'level-high';

}
const priceIncludingCurrency = (price: ListingItem['price'], currency_code: ListingItem['currency_code']): string | undefined => {
  if (!price) {
    return undefined;
  }

  switch (currency_code) {
    case 'USD':
      return `$${price}`;
    case 'EUR':
      return `€${price}`;
    default:
      return `${price} ${currency_code || ''}`;
  }
}
const titleNormalization = (title: ListingItem['title']): string | undefined => {
  if (title && title.length > 50) {
    return title.slice(0, 50) + '…';
  }

  return title;
}

function Listing({ items = [] }: ListingProps) {
  return (
    <div className="item-list">
      {items.map((item) => (
        <div className={cn("item", item.state === "removed" && "hidden")} key={item.listing_id}>
          <div className="item-image">
            <a href={item.url}>
              <img alt={item.title} src={item.MainImage?.url_570xN} />
            </a>
          </div>
          <div className="item-details">
            <p className="item-title">{titleNormalization(item.title)}</p>
            <p className="item-price">{priceIncludingCurrency(item.price, item.currency_code)}</p>
            <p className={cn("item-quantity", levelClassName(item.quantity))}>{item.quantity} left</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Listing;