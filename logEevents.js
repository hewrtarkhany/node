const {format} = require('date-fns');
const {v4: uuid } = require('uuid');
const path = require('path');
fily= path.join(__dirname, 'love.txt'),
fil= path.join(__dirname, 'love2.txt');

const fs = require('fs');
const fsPromises = require('fs').promises;

const logEvents = async (message) => {
    // CREATING A DATE TIME

    const dateTime = `${format( new Date (), 'yyyyMMdd\tHH:mm:ss')}`;
    // PUTTING date time uuid and the message in one line 
    // const logItem = `${dateTime}\t ${uuid()}\t${message}\n`;

    const ws = fs.createReadStream(fily,{encoding: `utf-8`})
    const rs = fs.createWriteStream(fil)
    const logItem = `${ws.pipe(rs).toString()}\t ${dateTime}\t ${uuid()}\t${message}\n`

    console.log(logItem);
    // testing
    try{
        // we wait once we get those datas then we append it to a folder and file if it does not exist 
        if (!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
    
        await fsPromises.appendFile(path.join(__dirname, 'logs','eventLog.txt'),logItem);

    }catch (err){
        console.error(err);

    }
}
module.exports = logEvents;

