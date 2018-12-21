import React from 'react'
import { Table } from 'reactstrap'

const HeaderTableValue = ({ row, data, index }) => {
  if (row.renderer) {
    return row.renderer(data, index)
  }

  return row.accessor ? row.accessor(data) : data[row.id]
}

const HeaderTable = ({ rows, data }) => (
  <Table size="sm">
    <tbody>
      {rows.map((row, index) => (
        <tr key={row.id}>
          <th scope="row" className="w-50">
            {row.header}
          </th>
          <td className="w-50">
            <HeaderTableValue row={row} data={data} index={index} />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
)

export default HeaderTable
