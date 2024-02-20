import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Fragment } from 'react';

function BasicTable({ head, data, modalOpen }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {head && head.map((item, index) => {
                        return (
                            <Fragment key={`head-${index}`}>
                                <th>{item}</th>
                            </Fragment>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {data && data.map((employee, index) => {
                    return (
                        <tr key={`body-${index}`}>
                            <TableRow column={head} item={employee} modalOpen={modalOpen} />
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

const TableRow = ({ column, item, modalOpen }) => {
    return (
        column.map((col, index) => {
            return (
                <Fragment key={`body-${index}`}>
                    <td>
                        {col === '#' && item.Id}
                        {item[col.replace(/\s/g, '')]}
                        {col === 'Update' && <Button variant="primary" onClick={() => modalOpen(item, 'update')}>Update</Button>}
                        {col === 'Delete' && <Button variant="danger" onClick={() => modalOpen(item, 'delete')}>Delete</Button>}
                    </td>
                </Fragment>

            )
        }
        )
    )
}

export default BasicTable;
