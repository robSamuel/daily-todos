/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import Button from '@material-ui/core/Button';
import { SettingsPanel } from '/imports/ui/components/widgets/SettingsPanel';
import { Table } from '/imports/ui/components/widgets/Table';
import useProducts from '/lib/services/useProducts';
import { formatAmount } from '/lib/utils/numberUtils'; 
import { useStyles } from './styles';

const columnStyle = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  border: 'none',
  textTransform: 'capitalize'
};

const BillingList = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { products, loading } = useProducts('GET');
  const classes = useStyles();  

  const onCreate = () => {};

  const onEdit = () => {};

  const onDelete = () => {};

  const isSelectedRow = id => 
    isEmpty(selectedRecord) ? false : selectedRecord.ProductId === id;

  const onRowClick = record => {
    if(!isEmpty(record))
      setSelectedRecord(record);
  };

  const getColumns = () => [
    {
      Header: 'Id',
      accessor: 'ProductId',
      style: {...columnStyle, width: 50 },
    },
    {
      Header: 'SKU',
      accessor: 'SKU',
      style: columnStyle,
    },
    {
      Header: 'Model',
      accessor: 'Model',
      style: columnStyle,
    },
    {
      Header: 'Description',
      accessor: 'Description',
      style: columnStyle,
    },
    {
      Header: 'Quantity',
      accessor: 'Quantity',
      style: columnStyle,
    },
    {
      Header: 'Price',
      id: 'Price',
      accessor: record => record,
      style: columnStyle,
      Cell: props => {
        const {value: record = {}} = props;
        const price = formatAmount(record.Price, true, 'C$');
  
        return <span>{price}</span>;
      }
    },
    {
      Header: 'Dollar Price',
      id: 'DollarPrice',
      accessor: record => record,
      style: columnStyle,
      Cell: props => {
        const {value: record = {}} = props;
        const price = formatAmount(record.DollarPrice, true);
  
        return <span>{price}</span>;
      }
    },
  ];

  const renderButton = (label, onClick, color = 'primary') => (
    <Button
      variant="contained"
      color={color}
      className={classes.button}
      onClick={onClick}
    >
      {label}
    </Button>
  );

  const renderTable = () => (
    <Table
      data={products}
      columns={getColumns()}
      load={false}
      loading={loading}
      rowSelected={false}
      getTrProps={(state, rowInfo) => {
        const record = rowInfo.original;
        const selected = isSelectedRow(record.ProductId);

        return {
          onClick: () => onRowClick(record),
          // onDoubleClick
          className: selected ? 'active' : '',
        };
      }}
    />
  );

  return (
    <div className={classes.container}>
      <SettingsPanel>
        <SettingsPanel.Toolbar>
          {renderButton('New', onCreate)}
          {renderButton('Edit', onEdit)}
          {renderButton('Delete', onDelete, 'secondary')}
        </SettingsPanel.Toolbar>
        {renderTable()}
      </SettingsPanel>
    </div>
  );
};

export default BillingList;
