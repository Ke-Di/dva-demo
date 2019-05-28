import { connect } from "dva";

import TableRender from "../utilComponents/TableRender";
import {
  RenderFun,
  CertStatusText,
  UnixToDate
} from "../../utils/utilFunction";
import styles from "./Index.css";

let tableData = {
  data: [],
  total: 110
};
for (let i = 0; i < 99; i++) {
  const corpId = Math.random()
    .toString(36)
    .substring(2);
  const registeredCapital = Math.random()
    .toString()
    .substring(9);
  tableData.data.push({
    corpId,
    corpName: `GitHub Repository Name ${corpId}`,
    corpManager: `百家姓${i + 1}`,
    registeredCapital,
    corpPerson: `${(i * 300) % 77}`,
    certStatus: `${i % 3}`
  });
}

const ArraySort = arr => arr.slice().sort(() => Math.random() - 0.5);

const TableList = ({ dispatch, count }) => {

  const columns = [
    {
      title: "序号",
      key: "index",
      render: (text, record, index) => ++index,
      align: "center"
    },
    {
      title: "企业名称",
      key: "corpName",
      dataIndex: "corpName",
      render: (text, record, index) => {
        const Color = Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padEnd(6, "0");
        return <span style={{ color: `#${Color}` }}>{text}</span>;
      },
      align: "center"
    },
    {
      title: "联系人",
      key: "corpManager",
      dataIndex: "corpManager",
      render: RenderFun,
      align: "center"
    },
    {
      title: "注册资本（元）",
      key: "registeredCapital",
      dataIndex: "registeredCapital",
      render: (text, record, index) => {
        return (Number(text) * 0.01).toFixed(2);
      },
      align: "center"
    },
    {
      title: "企业人数",
      key: "corpPerson",
      dataIndex: "corpPerson",
      render: RenderFun,
      align: "center"
    },
    {
      title: "认证状态",
      key: "certStatus",
      dataIndex: "certStatus",
      render: (text, record, index) => {
        return CertStatusText(Number(text));
      },
      align: "center"
    },
    {
      title: "注册时间",
      key: "createTime",
      dataIndex: "registeredCapital",
      render: (text, record, index) => {
        return UnixToDate(text, "YYYY/MM/DD HH:mm:ss") || "——";
      },
      align: "center"
    }
  ];

  // if (userInfo.role === 3) {
  //   columns.length -= 1;
  // }

  return (
    <div className={styles.tableContainer}>
      <TableRender
        rowKey={record => record.corpId}
        columns={columns}
        data={ArraySort(tableData.data)}
        total={tableData.total}
      />
    </div>
  );
};

TableList.propTypes = {};

const mapStateToProps = ({ count }) => ({ count });

export default connect(mapStateToProps)(TableList);
