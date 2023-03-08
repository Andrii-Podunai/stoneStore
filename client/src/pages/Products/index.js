//@flow

import * as React from 'react';
import { Pagination } from 'antd';
import { useSearchParams } from 'react-router-dom';
import ProductsFilter from './ProductsFilter';
import Loader from '../../components/Loader';
import { useUserToken, useFavorites, useCards, useCardsCount } from 'rest/index.js';
import { dataMapper } from './ProductsServices';

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
  const [searchParams, setSearchParams] = useSearchParams();

  React.useMemo(() => {
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const currentPage = searchParams.get('page');
    const pageSize = searchParams.get('pageSize');
    if (category !== null) {
      setCategoryValue(category);
    }
    if (category === null) {
      setCategoryValue('all');
    }
    if (type !== null) {
      setTypeValue(type);
    }
    if (currentPage !== null) {
      setCurrentPage(+currentPage);
    }
    if (currentPage === null) {
      setCurrentPage(1);
    }
    if (pageSize !== null) {
      setPageSize(+pageSize);
    }
  }, [searchParams]);

  React.useEffect(() => {
    reFetchCardsCount(categoryValue, typeValue, searchValue);
    reFetchCards(currentPage, pageSize, categoryValue, typeValue, searchValue);
    setIsLoading(false);
    // eslint-disable-next-line
  }, [currentPage, pageSize, categoryValue, typeValue, searchValue]);

  const onChangePagination = (page: number, pageSize: number) => {
    setSearchParams({ page: page, pageSize: pageSize, type: typeValue, category: categoryValue });
    document.documentElement.scrollTo(0, 0);
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
          {!errorCards && dataMapper(cards, favorites, token)}
        </div>
        <Pagination
          current={currentPage}
          onChange={onChangePagination}
          total={cardsCount}
          defaultPageSize={pageSize}
          showSizeChanger
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
        <Loader />
      </div>
      <Pagination
        current={currentPage}
        onChange={onChangePagination}
        total={cardsCount}
        defaultPageSize={pageSize}
        showSizeChanger
        pageSizeOptions={[12, 24, 48, 96]}
      />
    </div>
  );
}

export default Products;
