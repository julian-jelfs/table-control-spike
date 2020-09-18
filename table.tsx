import * as React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';



type DummyRecord = {
    [prop: string]: string;
}

type State = {
    data: DummyRecord[];
    pagination: {
        current: number;
        pageSize: number;
    },
    loading: boolean;
    selectedCols: number[];
}

const getRandomUserParams = params => {
    return {
        results: params.pagination.pageSize,
        page: params.pagination.current,
        ...params,
    };
};

class TableWrapper extends React.Component<{}, State> {
    state = {
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
        },
        loading: false,
        selectedCols: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    };

    componentDidMount() {
        const { pagination } = this.state;
        this.fetch({ pagination });
    }

    handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination, filters, sorter);
        this.setState({
            pagination: pagination
        });
        this.fetch({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
        });
    };

    fetch = (params) => {
        this.setState({ loading: true });
        fetch('http://localhost:1235', {
            method: 'post',
            headers: { 
                'content-type': 'application/json'
            },
            body: JSON.stringify(getRandomUserParams(params))
        }).then(resp => resp.json())
            .then(data => {
                console.log(data);
                this.setState({
                    loading: false,
                    data: data.results,
                    pagination: {
                        ...params.pagination,
                        total: data.total,
                    },
                });
            });
    };
     
    selectColumns(ev) {
        const indexes = Array.from(ev.target.options).filter((o:any) => o.selected).map((o:any) => Number(o.value));
        this.setState({
            selectedCols: indexes
        })
    }
     
    download() {
        fetch('http://localhost:1235/download', {
            method: 'post',
            headers: { 
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                pagination: this.state.pagination
            })
        }).then(res => res.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = `report-${new Date().toISOString()}.xlsx`;
            document.body.appendChild(a); 
            a.click();    
            a.remove();
        });
    }

    render() {
        let columns = [{
                title: 'Animals',
                dataIndex: 'externalLink',
                key: 'externalLink',
                width: 200,
                sorter: true,
                fixed: true,
                render: (url, item, i) => {
                    return (
                        <a href={url} target="_blank">Pictures of {item.linkText}</a>
                    )
                }, 
            }];

        for (let j = 1; j < 21; j++) {
            columns.push({
                title: `Col ${j}`,
                dataIndex: `prop${j}`,
                key: `prop${j}`,
                width: 100,
                sorter: true,
                fixed: j === 0 ? true : undefined,
                render: undefined,
            })
        }
        const { data, pagination, loading } = this.state;
        return (
            <div>
                <label>Select Columns</label><br/>
                <select size={10} multiple={true} value={this.state.selectedCols.map(c => c.toString())} onChange={(e) => this.selectColumns(e)}>
                    {columns.map((c,i) => {
                        return (
                            <option key={i} value={i}>{c.title}</option>
                        )
                    })}
                </select>
                <Table
                    columns={columns.filter((c,i) => this.state.selectedCols.includes(i))}
                    rowKey={record => record.id}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    onChange={this.handleTableChange}
                    scroll={{ y: 400 }}
                />

                <button onClick={() => this.download()}>
                    Download as xls
                </button>
            </div>
        );
    }
}

export { TableWrapper }