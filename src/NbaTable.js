import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";


class NbaTable extends Component {
  
  render() {
    const columns=[
          {
            Header: 'Team Name',
            accessor: 'team',
            getProps: (state, rowInfo, column) => {
                return {
                    style: {
                        background: rowInfo &&  rowInfo.original.color,
                    },
                    onClick: (e) => {
                         console.log("A Td Element was clicked!");
                         console.log("It was in this row:", rowInfo);
                         console.log("HELOO" , rowInfo.row)
                    },
                };
            },
          },
          {
            Header: 'Wins',
            accessor: 'wins',
            width: 50,
            getProps: (state, rowInfo, column) => {
                return {
                    style: {
                        background: rowInfo  && rowInfo.original.color,
                    },
                };
            },
          },
          {
            Header: 'Loses',
            accessor: 'loses',
            width: 50,
            getProps: (state, rowInfo, column) => {
                return {
                    style: {
                        background: rowInfo  && rowInfo.original.color,
                    },
                };
            },
          }
    ];

    return (
          <div style={{width: 400}}>
              <ReactTable
                data={this.props.tableData}
                columns={columns}
                defaultPageSize={16}
                showPageSizeOptions={false}
              />
          </div>      
    )

  }
}

export default NbaTable;