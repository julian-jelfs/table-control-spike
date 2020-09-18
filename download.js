const xl = require('excel4node')

module.exports = function downloadAsExcel(data, req, res) {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Sheet 1');
    data.forEach((item, r) => {
        Object.keys(item).map((k, c) => {
            if(k != 'id') {
                 console.log(r, c, item[k])
                 ws.cell(Number(r+1),Number(c)).string(String(item[k]))
            }
        })
    });
    wb.write('ExcelFile.xlsx', res);
}
