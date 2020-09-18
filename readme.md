# React table component spike

This is a simple prototype to demonstrate the required features of a React table component to replace Hanson table in
the CRC. 

The first attempt will be using Ant Design. 

To run locally run `npm run start` to host the page (port 1234) and `npm run server` to start the server (port 1235). 

We want to demonstrate the following features: 

* MUST support excel download of data

* Need to support data that’s variety of data types (e.g. strings, numerical)

* Need to support this in the download as well (e.g. if it’s a timestamp, download is a timestamp)

* Need to support fixed header

* Need to support a fixed column

* Need to support clickable URLs in a cell

* Need to support editing what columns you can view in the table

* Need to support translated content (e.g. headers in different language)

* Need to support this in the download as well (if the header is in chinese, the header in the download should be chinese) 

* Nice to have to sort on columns

* Nice to have filter on columns
