// Using modified version of DevExtreme React Grid https://devexpress.github.io/devextreme-reactive/react/grid/

import * as React from 'react';
import { Card } from 'reactstrap';
import { RowDetailState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-bootstrap4';
import './UserTile.css';

const RowDetail = ({ row }) => (
  <div>
    <div className="userTileImgDiv"><img src="https://pbs.twimg.com/profile_images/1002272769352978433/9S4QWSR0_400x400.jpg" className="userTileImgStyle" alt=''/></div>
    <div className="userTileDetailStyle">
      <p><b>{row.name}</b><br/>
      {row.email}</p>
      <p>
        <strong>Address:</strong><br/>
        {row.address}<br/>
        {row.city}, {row.state} {row.zipcode}
      </p>
      <p><strong>Skills:</strong><br/>
      {row.skill.replace(/,/g, ', ')}</p>
    </div>
  </div>
);



export default class userTileBriteGrid2 extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'city', title: 'City' },
        { name: 'state', title: 'State' }
      ],
      rows: this.generateRows(this.props.users),
    };

  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.users !== prevProps.users) {
      this.setState({
        rows: this.generateRows(this.props.users)
      })
    }
  }

  generateRows(users){
  let rows = [];
  let data = users;
  for (let i=0;i<data.length;i++){
    let temp = {}
    temp['name'] = `${data[i]['firstname']} ${data[i]['lastname']}`;
    temp['city'] = data[i]['city'];
    temp['state'] = data[i]['state'];
    temp['email'] = data[i]['username'];
    temp['address'] = data[i]['address1'];
    temp['zipcode'] = data[i]['zip'];
    temp['skill'] = data[i]['skill'];
    temp['id'] = data[i]['_id'];
    temp['image'] = `./images/${data[i]['_id']}/profilePic`
    rows.push(temp);
  }
  return rows
  }

  render() {
    console.log(this.props.users)
    const { rows, columns } = this.state;

    return (
      <Card className="userTileGrid">
        <Grid
          rows={rows}
          columns={columns}
        >
          <RowDetailState
            defaultExpandedRowIds={[0]}
          />
          <Table />
          <TableHeaderRow />
          <TableRowDetail
            contentComponent={RowDetail}
          />
        </Grid>
      </Card>
    );
  }
}