import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { requestGetQuery, requestGetCount } from './requests';
import ProductCard from 'components/ProductCard';
import { URL } from './requests';
import emptyImg from './emptyImage.png';
import { Link } from 'react-router-dom';

function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [activeCardsCount, setActiveCardsCount] = useState(20);
  const [currentData, setCurrentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    requestGetCount().then((data) => {
      setActiveCardsCount(data);
    });
    requestGetQuery(currentPage, pageSize)
      .then((data) => {
        setCurrentData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, pageSize]);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const onShowSizeChange = (current, pageSize) => {
    setPageSize(pageSize);
  };
  if (isLoading === false) {
    return (
      <div className="container pb-3">
        <ul className="list-unstyled d-flex gap-3 flex-wrap justify-content-center pt-3 pb-3">
          {currentData.map(({ _id, price, images, category, title, currency }) => {
            const image =
              typeof images[0].name !== 'undefined'
                ? URL + '/public/cards-images/' + images[0].name
                : emptyImg;
            return (
              <li key={_id}>
                <Link to={_id}>
                  <ProductCard
                    price={price}
                    category={category}
                    title={title}
                    image={image}
                    currency={currency}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
        <Pagination
          current={currentPage}
          onChange={onChange}
          total={activeCardsCount}
          defaultPageSize={pageSize}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
        />
      </div>
    );
  }

  return (
    <div className="container pb-3">
      <div className="text-center mt-4 mb-4">
        <div className="spinner-border" role="status"></div>
      </div>
      <Pagination
        current={currentPage}
        onChange={onChange}
        total={activeCardsCount}
        defaultPageSize={pageSize}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
      />
    </div>
  );
}

export default Products;
