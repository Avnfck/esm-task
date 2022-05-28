const readCSV = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
        let rows = reader.result.split('\n');
        rows.pop();

        rows.forEach((row, rowIndex) => {
            let tableRow = document.createElement('tr');
            document.querySelector('#mainTable').append(tableRow);

            rowIndex+1 === 1 
            ? document.querySelector(`tr:nth-of-type(${rowIndex+1})`).innerHTML = '<td>Details</td>' 
            : document.querySelector(`tr:nth-of-type(${rowIndex+1})`).innerHTML = '<td><button class="detailsBtn">Details</button></td>';

            row.split(',').forEach((cell, cellIndex) => {
                let rowCell = document.createElement('td');
                document.querySelector(`tr:nth-of-type(${rowIndex+1})`).append(rowCell);

                cellIndex < 2 && rowIndex != 0
                ? document.querySelector(`tr:nth-of-type(${rowIndex+1}) td:nth-of-type(${cellIndex+2})`).innerHTML = `<a href="${row.split(',')[1]}" target=”_blank”>${cell}</a>`
                : cellIndex === 2 && rowIndex != 0
                ? document.querySelector(`tr:nth-of-type(${rowIndex+1}) td:nth-of-type(${cellIndex+2})`).innerHTML = `<a href="${row.split(',')[2]}" target=”_blank”>${cell}</a>`
                : document.querySelector(`tr:nth-of-type(${rowIndex+1}) td:nth-of-type(${cellIndex+2})`).textContent = cell;
            });
        });
        document.querySelectorAll('.detailsBtn').forEach((btn, btnIndex) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                fetch(`/single?address=${encodeURIComponent(document.querySelector(`tr:nth-of-type(${btnIndex+2}) td:nth-of-type(3)`).textContent)}`).then((response) => {
                    response.json().then((data) => {
                        const productData = data.data;
                        // console.log(Object.keys(productData.variants).length)
                        let detailsTable = document.createElement('table');
                        detailsTable.className = 'detailedTable';
                        document.querySelector(`tr:nth-of-type(${btnIndex+2})`).after(detailsTable);
                        createSubTable(productData, btnIndex)
                    });
                });
            });
        });
    }

    reader.readAsText(file.files[0]);
}

const createSubTable = (data, index) => {
    console.log(data)
    const dataLength = Object.keys(data).length - 1;
    const isVariant = Object.keys(data.variants).length;
    const tdCount = dataLength + isVariant;
    
    if (isVariant != 0) {
        Object.keys(data.variants).forEach((variant, varIndex) => {
            let row = document.createElement('tr');
            let nextElement = document.querySelector(`#mainTable tr:nth-of-type(${index+2})`).nextElementSibling;
            nextElement.append(row);

            row.innerHTML = `<td></td>
                            <td>${data.productName} ${variant}</td>
                            <td>${data.productCode}</td>
                            <td><a href="${data.img}">${data.img}</a></td>
                            <td>${data.variants[variant].price}</td>
                            <td><del>${data.variants[variant].price_old}</del></td>
                            <td>${data.countVotes}</td>
                            <td>${data.countStars}</td>`
        });
    } else {
        let row = document.createElement('tr');
        let nextElement = document.querySelector(`#mainTable tr:nth-of-type(${index+2})`).nextElementSibling;
        nextElement.append(row);

        row.innerHTML = `<td></td>
                            <td>${data.productName}</td>
                            <td>${data.productCode}</td>
                            <td><a href="${data.img}">${data.img}</a></td>
                            <td>${data.price}</td>
                            <td><del>${data.preSale}</del></td>
                            <td>${data.countVotes}</td>
                            <td>${data.countStars}</td>`
    }

}

export { readCSV };