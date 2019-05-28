import { Table } from "antd";
import { PageSize, PageSizeOptions } from "../../constants";

const TableRender = props => {
  const {
    columns = [],
    data = [],
    loading = false,
    total = 0,
    pageNum = 1,
    pageSize = PageSize || 5,
    onShowSizeChange,
    onChange,
    rowSelection = null,
    expandedRowRender = null,
    rowKey
  } = props;

  let pagination = {
    total: total === undefined ? 0 : total,
    showTotal: (total, range) =>
      `第 ${range[0]} - ${range[1]} 条，共 ${total} 条`,
    showSizeChanger: true,
    current: pageNum,
    pageSize: pageSize,
    pageSizeOptions: PageSizeOptions.map(item => String(item)),
    onShowSizeChange: (current, pageSize) => {
      onShowSizeChange(current, pageSize);
    },
    onChange: (current, pageSize) => {
      onChange(current, pageSize);
    },
    showQuickJumper: true
  };

  return (
    <div>
      <Table
        size="small"
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={onChange ? pagination : false}
        rowSelection={rowSelection}
        expandedRowRender={expandedRowRender}
        rowKey={rowKey}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "evenRow" : "oddRow"
        }
      />
    </div>
  );
};

export default TableRender;
