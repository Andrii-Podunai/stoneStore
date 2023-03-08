import { Radio } from 'antd';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { Input } from 'antd';
import { useState } from 'react';
import CloseIcon from 'components/icons/Close';

const categoryOptions = [
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

const typeOptions = [
  {
    label: 'Всі',
    value: 'all',
  },
  {
    label: 'Купити',
    value: 'buy',
  },
  {
    label: 'Продати',
    value: 'sell',
  },
  {
    label: 'Безкоштовно',
    value: 'free',
  },
];

function ProductsFilter({ categoryValue, typeValue, onSearch }) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleChangeCategory = ({ target: { value } }: Object) => {
    navigate({
      search: `${createSearchParams({ category: value, type: typeValue })}`,
    });
  };
  const handleChangeType = ({ target: { value } }: Object) => {
    navigate({
      search: `${createSearchParams({ category: categoryValue, type: value })}`,
    });
  };

  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
    navigate({
      search: `${createSearchParams({ category: categoryValue, type: typeValue })}`,
    });
  };

  const handleReset = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <div className="container">
      <div className="filter-bg row py-2 shadow-sm rounded" style={{ backgroundColor: '#F9F9F9' }}>
        <div className="col-xxl-4 col-xl-3 col-lg-12 row mb-2 mb-xl-0">
          <div className="col-lg-12 col-xl-12 mt-3 mt-lg-0 d-flex align-items-center position-relative">
            <Input onChange={handleChangeSearch} value={searchValue} placeholder="Я шукаю..." />
            <div role="button" className="position-absolute end-0 me-3" onClick={handleReset}>
              <CloseIcon />
            </div>
          </div>
        </div>
        <div className="col d-flex flex-wrap gap-xxl-5 gap-3">
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <div>Категорія:</div>
            <Radio.Group
              options={categoryOptions}
              onChange={handleChangeCategory}
              value={categoryValue}
              optionType="button"
              buttonStyle="solid"
            />
          </div>
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <div>Тип:</div>
            <Radio.Group
              options={typeOptions}
              onChange={handleChangeType}
              value={typeValue}
              optionType="button"
              buttonStyle="solid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsFilter;
