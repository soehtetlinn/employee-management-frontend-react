import React, { Component } from "react";
import "./EmployeeTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  faPlus,
  faTrash,
  faEdit,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;


class AdminEmployeeTable extends Component {
  state = {
    employeeData: [],
    loading: true,

    columnDefs: [
      {
        headerName: "Employee Code",
        field: "EmployeeCode",
        sortable: true,
        width: 140,
        // filter: true ,
      },
      {
        headerName: "Email",
        field: "Email",
        sortable: true,
        // filter: true ,
        width: 150,
      },
      {
        headerName: "First Name",
        field: "FirstName",
        sortable: true,
        width: 110,

        // filter: true ,
      },
      {
        headerName: "Middle Name",
        field: "MiddleName",
        sortable: true,
        width: 130,

        // filter: true ,
      },
      {
        headerName: "Last Name",
        field: "LastName",
        sortable: true,
        width: 110,

        // filter: true ,
      },
      {
        headerName: "DOB",
        field: "DOB",
        sortable: true,
        width: 110
        // filter: true,
        // type: ["dateColumn"],
        // filter: "agDateColumnFilter"
      },
      {
        headerName: "ContactNo",
        field: "ContactNo",
        sortable: true,
        width: 117,
        // filter: true ,
      },

      {
        headerName: "Role",
        field: "RoleName",
        sortable: true,

        width: 70,
        // filter: true ,
      },
      {
        headerName: "Position Name",
        field: "PositionName",
        sortable: true,
        width: 120,

        // filter: true ,
      },
      {
        headerName: "Department Name",
        field: "DepartmentName",
        sortable: true
        ,
        width: 120,
        // filter: true ,
      },



      {
        headerName: "Date Of Joining",
        field: "DateOfJoining",
        sortable: true
        ,
        width: 120,
        // filter: true ,

      },
      {
        headerName: "",
        field: "info",
        filter: false,
        width: 30,
        // cellRenderer:this.ageCellRendererFunc,
        // cellRendererFramework: function(params) {
        //   return <button OnClick={console.log("pa",params)}>Test</button>;
        // },
        cellRendererFramework: this.renderInfoButton.bind(this),


      },
      {
        headerName: "",
        field: "edit",
        filter: false,
        width: 30,
        // cellRenderer:this.ageCellRendererFunc,
        // cellRendererFramework: function(params) {
        //   return <button OnClick={console.log("pa",params)}>Test</button>;
        // },
        cellRendererFramework: this.renderEditButton.bind(this),


      },
      {
        headerName: "",
        field: "delete",
        filter: false,
        width: 30,
        // cellRenderer:this.ageCellRendererFunc,
        // cellRendererFramework: function(params) {
        //   return <button OnClick={console.log("pa",params)}>Test</button>;
        // },
        cellRendererFramework: this.renderButton.bind(this),


      },

    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 100,
      filter: "agTextColumnFilter"
      // filter: true ,
    },
    getRowHeight: function (params) {
      return 35;
    }
  };
  employeeObj = [];
  rowDataT = [];

  loadEmployeeData = () => {
    let requestBody = {
      operation:'read',
      data:{
        "EmployeeInfo": {
          "EmployeeId": {
            "S": "011"
          },
          "LastName": {
            "S": "Lee"
          }
        },
        "UpdatedEmployee": {
          "Firstname": {
            "S": "Soe Htut"
          },
          "LastName": {
            "S": "Linn"
          },
          "age": {
            "N": "27"
          },
          "department": {
            "S": "SE"
          }
        }
      }
    }
    const header = { // HTTP headers
      'Content-Type': 'application/json'
    }    
    axios
      .get(
        "https://i5z6ubo553.execute-api.us-east-2.amazonaws.com/prod/employees"
      )
      .then(res => {
        // this.employeeObj = response.data;
        console.log("res_data_body_msg", res.data.body.message);
        res.data.body.message.map(item => {
          console.log("item>>",item)
          let temp = {
            EmployeeCode: item["EmployeeCode"] ? item["EmployeeCode"]["S"] : "Not Available ",
            FirstName: item["FirstName"] ? item["FirstName"]["S"] : "Not Available ",
            LastName: item["LastName"] ? item["LastName"]["S"] : "Not Available ",
            DepartmentName: item["DepartmentName"] ? item["DepartmentName"]["S"] : "Not Available ",
            Email: item["Email"] ? item["Email"]["S"] : "Not Available ",
            Password: item["Password"] ? item["Password"]["S"] : "Not Available ",
            Account: item["Account"] ? item["Account"]["S"] : "Not Available ",
            MiddleName: item["MiddleName"] ? item["MiddleName"]["S"] : "Not Available ",
            DOB: item["DOB"] ? item["DOB"]["S"] : "Not Available ",
            ContactNo: item["ContactNo"] ? item["ContactNo"]["S"] : "Not Available ",
            PositionName: item["PositionName"] ? item["PositionName"]["S"] : "Not Available ",
            DateOfJoining: item["DateOfJoining"] ? item["DateOfJoining"]["S"] : "Not Available ",
          }
          this.rowDataT.push(temp);
        });
        this.setState({rowData:this.rowDataT});
      })
      .catch(error => {
        console.log(error);
      });
  };

  onEmployeeDelete = e => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      window.alert("You are not allowed to perform this operation");
      // axios
      //   .delete(process.env.REACT_APP_API_URL + "/api/employee/" + e, {
      //     headers: {
      //       authorization: localStorage.getItem("token") || ""
      //     }
      //   })
      //   .then(res => {
      //     this.componentDidMount();
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  };
  componentDidMount() {
    this.loadEmployeeData();
  }
  handleClick = (e) => {
    console.log(e);
  }
  renderInfoButton(params) {
    console.log(params);
    return <div>
      <FontAwesomeIcon
        icon={faInfoCircle}
        onClick={() => this.props.onEmpInfo(params.data.data)}
      /></div>;
  }
  renderButton(params) {
    console.log(params);
    return <FontAwesomeIcon
      icon={faTrash}
      onClick={() => this.onEmployeeDelete(params.data.data["_id"])}
    />;
  }


  renderEditButton(params) {
    console.log(params);
    return <FontAwesomeIcon
      icon={faEdit}
      onClick={() => this.props.onEditEmployee(params.data.data)}
    />;
  }

  searchChange = e => {
    console.log(e.target.value);
    this.setState({ searchData: e.target.value });
  };
  // getFilteredEmp() {
  //   return this.employeeObj.filter(emp => {
  //     return (
  //       emp["Email"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["role"][0]["RoleName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["FirstName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["MiddleName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["LastName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["DOB"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["ContactNo"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["EmployeeCode"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["department"][0]["DepartmentName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["position"][0]["PositionName"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase()) ||
  //       emp["DateOfJoining"]
  //         .toLowerCase()
  //         .includes(this.state.searchData.toLocaleLowerCase())
  //     );
  //   });
  // }

  render() {
    // let filteredEmp = this.getFilteredEmp();
    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Employee Details</h2>

        <Button
          variant="primary"
          id="add-button"
          onClick={this.loadEmployeeData}
        >
          <FontAwesomeIcon icon={faInfoCircle} id="plus-icon" />
          Load
        </Button>

        <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddEmployee}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add
        </Button>
        <div id="clear-both" />
        <div className="ag-grid-container">
          <div id="table-div" className="ag-theme-balham">
            <AgGridReact
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}
                  pagination={true}
                  paginationPageSize={15}
                  getRowHeight={this.state.getRowHeight}
                />
          </div>
        </div>

        {/* <div id="clear-both" /> */}
        {/* {!this.state.loading ? (
          <div id="table-div" className="ag-theme-balham">
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              // columnTypes={this.state.columnTypes}
              rowData={this.state.rowData}
              // floatingFilter={true}
              // onGridReady={this.onGridReady}
              pagination={true}
              paginationPageSize={10}
              getRowHeight={this.state.getRowHeight}
            />
          </div>
        ) : (
            <div id="loading-bar">
              <RingLoader
                css={override}
                sizeUnit={"px"}
                size={50}
                color={"#0000ff"}
                loading={true}
              />
            </div>
          )} */}

      </div>
    );
  }
}

export default AdminEmployeeTable;
