import PropTypes from 'prop-types';

const StoreArticles = ({ categories, searchTerm, filteredProducts }) => {
  return (
    <>
      {Object.entries(categories).map(([title, items]) => (
        //DYNAMICALLY ADDS THE SUBTITLES ABOVE THE PRODUCT
        <section key={title}>
          <section className="subtitle"><h1>{title}</h1></section>
          {/*SEARCH BAR WITH FILTER*/}
          <section className="store">
            {filteredProducts(items)
              .filter(p =>
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(({ id, description, title, price, image, details }) => (
                <article key={id}>
                  <figure className="c1xr3">
                    <a href={`/product/${id}`}>
                      <img src={image} alt={details} />
                    </a>
                  </figure>
                  <p>{description}</p>
                  <p>{title}</p>
                  <p>{price.toFixed(2)}€</p>
                </article>
              ))}
          </section>
        </section>
      ))}
    </>
  );
};

StoreArticles.propTypes = {
  categories: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.string)
  ).isRequired,

  searchTerm: PropTypes.string.isRequired,

  filteredProducts: PropTypes.func.isRequired
};

export default StoreArticles;
