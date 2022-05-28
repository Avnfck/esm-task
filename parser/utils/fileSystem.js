import fs from 'fs';

const saveCSV = (array) => {
    try {
        let data = ``;
        array.forEach(row => {
            row.join(',');
            data += `${row}\n`
        });
        fs.writeFileSync('./data.csv', data, 'utf-8');
        console.log('Data saved to CSV!');
    } catch (e) {
        console.log(`Unable to save data to CSV: ${e.message}`);
    }
}

const deleteFile = async (path) => {
    if(!fs.existsSync(path)){
        console.log('No file to delete.');
    } else {
        await fs.unlinkSync(path)
        console.log(`File ${path.match(/\.\/(.+\.csv)$/)[1]} has been deleted`)
    }
}

export { saveCSV, deleteFile };