const fs = require("fs");
const path = require("path");

exports.task = async (request, response) => {
  const { array, key } = request.body;
  const originalArray = array;
  const startTime = process.hrtime();
  if (array.length < 1) {
    return response.status(400).json({
      message: "The array should have at least one element",
    });
  }
  try {
    const filePath = path.join(__dirname, "../../ridbay.json");

    if (fs.existsSync(filePath)) {
      const fileData = JSON.parse(fs.readFileSync(filePath));
      //file exist, check for the record
      const searchkey = fileData.find((element) => element.key == key);
      if (searchkey) {
        //the data already
        const searchElapsedSeconds = parseHrtimeToSeconds(
          process.hrtime(startTime)
        );
        return response.status(200).json({
          message: "Data already exist",
          // data: searchkey,
          keyIndexInOriginalArray: searchkey.keyIndexInOriginalArray,
          keyIndexInSortedArray: searchkey.keyIndexInSortedArray,
          // timeTakenToSort: `${sortedArrayElapsedSeconds} miliseconds`,
          // timeTakenToFind: `${findIndexSortedArrayElapsedSeconds} miliseconds`,
          totalTimeTaken: `${searchElapsedSeconds} miliseconds`,
        });
      }
    }

    const findIndexOriginalArray = array.findIndex((element) => element == key);
    if (findIndexOriginalArray < 0) {
      const notFoundElapsedSeconds = parseHrtimeToSeconds(
        process.hrtime(startTime)
      );
      return response.status(404).json({
        message: `${key} not found in the [${array}] provided`,
        timetaken: `${notFoundElapsedSeconds} miliseconds`,
      });
    }
    const sortedArray = array.sort((a, b) => a - b);
    const sortedArrayElapsedSeconds = parseHrtimeToSeconds(
      process.hrtime(startTime)
    );
    const findIndexSortedArray = sortedArray.findIndex(
      (element) => element == key
    );
    const findIndexSortedArrayElapsedSeconds = parseHrtimeToSeconds(
      process.hrtime(startTime)
    );
    const data = {
      originalArray: originalArray,
      key: key,
      keyIndexInOriginalArray: findIndexOriginalArray,
      sortedArray: sortedArray,
      keyIndexInSortedArray: findIndexSortedArray,
    };

    //check if the file already exist
    if (fs.existsSync(filePath)) {
      //file exist, write to it
      const fileData = JSON.parse(fs.readFileSync(filePath));
      fileData.push(data);
      fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
      const totalElapsedSeconds = parseHrtimeToSeconds(
        process.hrtime(startTime)
      );
      return response.status(200).json({
        message: "Data saved",
        keyIndexInOriginalArray: findIndexOriginalArray,
        keyIndexInSortedArray: findIndexSortedArray,
        timeTakenToSort: `${sortedArrayElapsedSeconds} miliseconds`,
        timeTakenToFind: `${findIndexSortedArrayElapsedSeconds} miliseconds`,
        totalTimeTaken: `${totalElapsedSeconds} miliseconds`,
      });
    } else {
      //File does not exist, create it and write to it
      const dataToSave = JSON.stringify([data], null, 2);
      fs.appendFile(filePath, dataToSave, function (err) {
        if (err) {
          return response.status(400).json({
            message: "error creating the file",
          });
        } else {
          const totalElapsedSeconds = parseHrtimeToSeconds(
            process.hrtime(startTime)
          );
          return response.status(200).json({
            message: "Data saved",
            keyIndexInOriginalArray: findIndexOriginalArray,
            keyIndexInSortedArray: findIndexSortedArray,
            timeTakenToSort: `${sortedArrayElapsedSeconds} miliseconds`,
            timeTakenToFind: `${findIndexSortedArrayElapsedSeconds} miliseconds`,
            totalTimeTaken: `${totalElapsedSeconds} miliseconds`,
          });
        }
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: "server error",
      error,
    });
  }
};

function parseHrtimeToSeconds(hrtime) {
  // const seconds = (hrtime[0] + hrtime[1] / 1e6).toFixed(3); //to seconds
  const seconds = (hrtime[0] + hrtime[1] / 1e6).toFixed(3); //to miliseconds
  return seconds;
}
