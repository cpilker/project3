import * as React from 'react';
import { Card } from 'reactstrap';
import { RowDetailState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-bootstrap4';

const imgDiv = {
  display: 'table-cell',
  width: '25%',
  verticalAlign: 'middle'
}

const imgStyle = {
  width: '90%'
}

const detailStyle = {
  display: 'table-cell',
  width: '75%',
  verticalAlign: 'middle'
}

const RowDetail = ({ row }) => (
  <div>
    <div style={imgDiv}><img src={row.image} style={imgStyle} alt=''/></div>
    <div style={detailStyle}>
      <p><b>{row.event}</b><br/>
      {row.date}</p>
      <p>{row.description}</p>
      <p>
        {row.location}<br/>
        {row.city}, {row.state} {row.zipcode}
      </p>
      <p><a href={row.url} target="_blank">{row.url}</a></p>
    </div>
  </div>
);



export default class EventBriteGrid2 extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'event', title: 'Event Name' },
        { name: 'date', title: 'Date' },
        { name: 'city', title: 'City' },
        { name: 'state', title: 'State' }
      ],
      rows: this.generateRows(this.props.gridData),
    };
  }

  generateRows(gridData){
  let rows = [];
  let data = gridData;
  console.log(data[0]['event']);
  for (let i=0;i<data.length;i++){
    let temp = {}
    temp['event'] = data[i]['event'];
    temp['date'] = data[i]['date'];
    temp['city'] = data[i]['city'];
    temp['state'] = data[i]['state'];
    temp['image'] = data[i]['image'];
    temp['description'] = data[i]['description'];
    temp['location'] = data[i]['location'];
    temp['zipcode'] = data[i]['zipcode'];
    temp['url'] = data[i]['url'];
    rows.push(temp);
  }
  return rows
}

  render() {
    const { rows, columns } = this.state;
    var style = {'width':'100%'}

    return (
      <Card style={style}>
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