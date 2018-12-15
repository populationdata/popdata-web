import React from 'react'
import { Table } from 'reactstrap'
import { css } from 'glamor'
import orderBy from 'lodash/orderBy'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'

const DataCell = ({ column, index, row }) => {
  if (column.renderer) {
    return column.renderer(row, column, index)
  }

  return column.accessor ? column.accessor(row) : row[column.id]
}

const headerCss = css({
  cursor: 'pointer',
  userSelect: 'none',
})

const sortIndicatorCss = css({
  marginLeft: '5px',
})

const SortIndicator = () => <FaSort {...css(sortIndicatorCss)} />

const AscIndicator = () => (
  <FaSortUp {...css(sortIndicatorCss, { verticalAlign: 'bottom' })} />
)
const DescIndicator = () => (
  <FaSortDown {...css(sortIndicatorCss, { verticalAlign: 'top' })} />
)

class DataTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sort: props.defaultSort,
      sortOrder: props.defaultSortOrder || 'asc',
    }
  }

  render() {
    const { columns, data: sourceData } = this.props
    const { sort, sortOrder } = this.state
    let data = sourceData
    if (sort) {
      const sortColumn = columns.filter(x => x.id === sort)[0]
      if (sortColumn) {
        const rowValueAccessor =
          sortColumn.valueAccessor || (row => row[sortColumn.id])
        data = orderBy(data, x => rowValueAccessor(x), sortOrder)
      }
    }
    return (
      <Table size="sm">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.id} className={column.className}>
                <div
                  {...headerCss}
                  onClick={() => this._headerClick(column.id)}
                >
                  {column.header}
                  {sort === column.id &&
                    (sortOrder === 'asc' ? (
                      <AscIndicator {...sortIndicatorCss} />
                    ) : (
                      <DescIndicator {...sortIndicatorCss} />
                    ))}
                  {sort !== column.id && !column.disableSort && (
                    <SortIndicator />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              {columns.map(column => (
                <td key={column.id} className={column.rowClassName}>
                  <DataCell column={column} index={index} row={row} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }

  _headerClick(columnId) {
    const { sort, sortOrder } = this.state
    if (columnId === sort) {
      this.setState({ sortOrder: sortOrder === 'asc' ? 'desc' : 'asc' })
    } else {
      this.setState({ sort: columnId })
    }
  }
}

export default DataTable
