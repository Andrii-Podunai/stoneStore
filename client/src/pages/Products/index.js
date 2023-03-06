//@flow

import * as React from 'react';
import { Pagination } from 'antd';
import ProductCard from 'components/ProductCard';
import emptyImg from 'images/emptyImage.png';
import { Link, useSearchParams } from 'react-router-dom';
import ProductsFilter from './ProductsFilter';
import { useUserToken, useFavorites, useCards, useCardsCount } from 'rest/index.js';

function Products(): React.Node {
  const [token] = useUserToken();
  const { favorites } = useFavorites(token);
  const { cards, reFetchCards, errorCards } = useCards();
  const [categoryValue, setCategoryValue] = React.useState<string>('');
  const [typeValue, setTypeValue] = React.useState<string>('all');
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(24);
  const { cardsCount, reFetchCardsCount } = useCardsCount(categoryValue, typeValue, searchValue);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [searchParams] = useSearchParams();

  React.useMemo(() => {
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    if (category !== null) {
      setCategoryValue(category);
    }
    if (category === null) {
      setCategoryValue('all');
    }
    if (type !== null) {
      setTypeValue(type);
    }
  }, [searchParams]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [categoryValue, typeValue, searchValue]);

  React.useEffect(() => {
    reFetchCardsCount(categoryValue, typeValue, searchValue);
    reFetchCards(currentPage, pageSize, categoryValue, typeValue, searchValue);
    setIsLoading(false);
    // eslint-disable-next-line
  }, [currentPage, pageSize, categoryValue, typeValue, searchValue]);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const onShowSizeChange = (current: number, pageSize: number) => {
    setPageSize(pageSize);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  if (isLoading === false) {
    return (
      <div className="container pb-3">
        <div className="pt-5 pb-3">
          <ProductsFilter
            categoryValue={categoryValue}
            typeValue={typeValue}
            onSearch={handleSearch}
          />
        </div>
        <div className="row mx-auto gap-3 py-3">
          {!errorCards &&
            cards.map(({ _id, price, images, category, title, currency, type }) => {
              const image = images.length > 0 && images[0].url ? images[0].url : emptyImg;
              let favorite = false;
              if (favorites !== false) {
                favorite = favorites.includes(_id);
              }
              return (
                <div key={_id} className="col p-0 d-flex justify-content-center">
                  <Link to={_id} className="w-100 text-decoration-none">
                    <ProductCard
                      id={_id}
                      price={price}
                      category={category}
                      title={title}
                      image={image}
                      currency={currency}
                      type={type}
                      favorite={favorite}
                      userToken={token}
                    />
                  </Link>
                </div>
              );
            })}
        </div>
        <Pagination
          current={currentPage}
          onChange={onChangePage}
          total={cardsCount}
          defaultPageSize={pageSize}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          pageSizeOptions={[12, 24, 48, 96]}
        />
      </div>
    );
  }

  return (
    <div className="container pb-3">
      <div className="pt-5 pb-3">
        <ProductsFilter
          categoryValue={categoryValue}
          typeValue={typeValue}
          onSearch={handleSearch}
        />
      </div>
      <div className="text-center mt-4 mb-4">
        <div className="spinner-border" role="status"></div>
      </div>
      <Pagination
        current={currentPage}
        onChange={onChangePage}
        total={cardsCount}
        defaultPageSize={pageSize}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        pageSizeOptions={[12, 24, 48, 96]}
      />
    </div>
  );
}

export default Products;
