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
import './EventBriteGrid2.css';

const RowDetail = ({ row }) => (
  <div>
    <div className="eventImgDiv"><img src={row.image} className="eventImgStyle" alt=''/></div>
    <div className="eventDetailStyle">
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

const FooterDetail = () => (  // Added an empty footer to clear React warning saying table footer is required
  <div></div>
)



export default class EventBriteGrid2 extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'event', title: 'Event Name' },
        { name: 'date', title: 'Date' },
        { name: 'city', title: 'City' }
      ],
      rows: this.generateRows(this.props.gridData),
    };
  }

  generateRows(gridData){
  let rows = [];
  let data = gridData;
  // console.log(data[0]['event']);
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

    return (
      <Card className="eventBriteGrid">
        <Grid
          rows={rows}
          columns={columns}
        >
          <RowDetailState
            defaultExpandedRowIds={[0]}
          />
          <Table
            footerComponent={FooterDetail}
           />
          <TableHeaderRow />
          <TableRowDetail
            contentComponent={RowDetail}
          />
        </Grid>
      </Card>
    );
  }
}