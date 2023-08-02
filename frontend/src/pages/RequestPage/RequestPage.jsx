import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "../../components/header/Header";
import requestavatar from "../../assets/request.png";
import accept from "../../assets/accept.png";
import reject from "../../assets/reject.png";

import "./RequestPage.css";

const RequestPage = () => {
  const tableData = [
    {
      name: "Tejas",
      tool: "Hammer",
      tillDate: "31/05/2002",
      quantity: "5",
    },
    {
      name: "Pratik Patil",
      tool: "2 BHK flat in salokhenager, Kolhapur",
      tillDate: "31/05/2002",
      quantity: "5",
    },
  ];
  return (
    <>
      <Header />
      <Sidebar />
      <div className="body-requestpage">
        <h1 className="head-request">Renting Request</h1>
        <div className="container-requestpage">
          <table id="customers" className="table-requestpage">
            <thead>
              <tr>
                <th>Name</th>
                <th>Tool</th>
                <th>Till Date</th>
                <th>Quantity</th>
                <th>Request</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5">
                  <hr className="hr-line-requestpage" />
                </td>
              </tr>
              {tableData.map((rowData, index) => (
                <tr key={index}>
                  <td>
                    <img src={requestavatar} alt="Common" className="avatar" />
                    {rowData.name}
                  </td>
                  <td>{rowData.tool}</td>
                  <td>{rowData.tillDate}</td>
                  <td>{rowData.quantity}</td>
                  <td>
                    <button className="request-button accept" type="submit">
                    <img className="accept-img" src={accept} alt="img" />
                    </button>
                    <button className="request-button reject" type="submit">
                      <img className="reject-img" src={reject} alt="img" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RequestPage;
