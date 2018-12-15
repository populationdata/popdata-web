import React from 'react'
import { Table } from 'reactstrap'

const DataCell = ({ column, index, row }) => {
  if (column.renderer) {
    return column.renderer(row, column, index)
  }

  return column.accessor ? column.accessor(row) : row[column.id]
}

class DataTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { columns, data } = this.props
    return (
      <Table size="sm">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.id} className={column.className}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              {columns.map(column => (
                <td className={column.rowClassName}>
                  <DataCell column={column} index={index} row={row} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}

export default DataTable
