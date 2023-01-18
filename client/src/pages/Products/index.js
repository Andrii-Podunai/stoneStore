//@flow

import * as React from 'react';
import { Pagination, Radio } from 'antd';
import { requestGetQuery, requestGetCount } from './requests';
import ProductCard from 'components/ProductCard';
import { URL } from './requests';
import emptyImg from 'images/emptyImage.png';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const radioOptions = [
  {
    label: 'Всі',
    value: 'all',
  },
  {
    label: 'Скло',
    value: 'glass',
  },
  {
    label: 'Папір',
    value: 'paper',
  },
  {
    label: 'Метал',
    value: 'metal',
  },
  {
    label: 'Пластик',
    value: 'plastic',
  },
];

function Products(): React.Node {
  const [categoryValue, setCategoryValue] = React.useState<string>('');
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(24);
  const [activeCardsCount, setActiveCardsCount] = React.useState<number>(24);
  const [currentData, setCurrentData] = React.useState<Array<Object>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  React.useMemo(() => {
    const category = searchParams.get('category');
    if (category !== null) {
      setCategoryValue(category);
    } else {
      setCategoryValue('all');
    }
  }, [searchParams]);

  React.useEffect(() => {
    setIsLoading(true);
    requestGetCount().then((data) => {
      setActiveCardsCount(data);
    });
    requestGetQuery(currentPage, pageSize, categoryValue)
      .then((data) => {
        setCurrentData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, pageSize, categoryValue]);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const onShowSizeChange = (current: number, pageSize: number) => {
    setPageSize(pageSize);
  };

  const onChangeCategory = ({ target: { value } }: Object) => {
    navigate(`?category=${value}`);
  };

  if (isLoading === false) {
    return (
      <div className="container pb-3">
        <Radio.Group
          className="pt-5 pb-3"
          options={radioOptions}
          onChange={onChangeCategory}
          value={categoryValue}
          optionType="button"
          buttonStyle="solid"
        />
        <ul className="list-unstyled d-flex gap-3 flex-wrap justify-content-center pt-3 pb-3">
          {currentData.map(({ _id, price, images, category, title, currency, type }) => {
            const image =
              images.length > 0 && images[0].name
                ? URL + '/public/cards-images/' + images[0].name
                : emptyImg;
            return (
              <li key={_id}>
                <Link to={_id} className="text-decoration-none">
                  <ProductCard
                    price={price}
                    category={category}
                    title={title}
                    image={image}
                    currency={currency}
                    type={type}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
        <Pagination
          current={currentPage}
          onChange={onChangePage}
          total={activeCardsCount}
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
      <Radio.Group
        className="pt-5 pb-3"
        options={radioOptions}
        onChange={onChangeCategory}
        value={categoryValue}
        optionType="button"
        buttonStyle="solid"
      />
      <div className="text-center mt-4 mb-4">
        <div className="spinner-border" role="status"></div>
      </div>
      <Pagination
        current={currentPage}
        onChange={onChangePage}
        total={activeCardsCount}
        defaultPageSize={pageSize}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        pageSizeOptions={[12, 24, 48, 96]}
      />
    </div>
  );
}

export default Products;
