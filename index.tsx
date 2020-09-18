import * as React from 'react';
import ReactDOM from 'react-dom';
import { TableWrapper } from './table';

const element = <h1>
    <TableWrapper />
</h1>

ReactDOM.render(element, document.getElementById("app"));
