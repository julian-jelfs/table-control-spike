const express = require('express');
const cors = require('cors')
const downloadAsExcel = require('./download');

const rows = 1000;
const cols = 20;
const data = [];

function createObj(i) {
    let obj = { 
        id: i, 
        externalLink: (i % 2 == 0) ? 'https://unsplash.com/s/photos/capybaras' : 'https://unsplash.com/s/photos/donkeys',
        linkText: (i % 2 == 0) ? 'Cabybaras' : 'Donkeys'
   };
    for (let j = 0; j < cols; j++) {
        obj[`prop${j}`] = `(${i}, ${j})`;
    }
    return obj;
}

for (let i = 0; i < rows; i++) {
    data.push(createObj(i));
}

function filterAndSort({ sortField, sortOrder }, data) {
    if (sortField && sortOrder) {
        return [...data].sort((a, b) => {
            if (a[sortField] < b[sortField]) {
                return sortOrder === 'ascend' ? -1 : 1;
            }
            if (a[sortField] > b[sortField]) {
                return sortOrder === 'ascend' ? 1 : -1;
            }
            return 0;
        })

    }
    return data;
}

const app = express();

app.use(cors());
app.use(express.json());

app.post('/', (req, res) => {
    const params = req.body;
    console.log(params);

    const skip = params.pagination.pageSize * (params.pagination.current - 1)
    const page = filterAndSort(params, data).slice(skip, skip + params.pagination.pageSize)
    res.status(200).json({
        results: page,
        total: data.length
    })
})

app.post('/download', (req, res) => {
    const params = req.body;
    return downloadAsExcel(filterAndSort(params, data), req, res)
})

app.listen(1235, () => {
    console.log('Server listening on 1235')
})