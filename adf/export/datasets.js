const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const request = require('request');
const fluigRestParams = JSON.parse(fs.readFileSync('fluig-rest-params.json'));
const auth = '?username=' + fluigRestParams.username + '&password=' + fluigRestParams.password;
const baseApi = fluigRestParams.host + '/ecm/api/rest/ecm/dataset/';
const hasTheDatasetChangedUrl = baseApi + 'hasTheDatasetChanged' + auth;
const editDataset = baseApi + 'editDataset' + auth;
const createDataset = baseApi + 'createDataset' + auth;
const getDatasets = baseApi + 'getDatasets' + auth;

module.exports = function () {
  request(getDatasets, function (error, response, body) {

    const datasets = JSON.parse(body);

    gulp.src(fluigRestParams.projectDir + '/datasets/*.js')
      .pipe($.tap(file => {

        const json = fluigRestParams.datasetParams;
        const name = path.basename(file.path, path.extname(file.path));
        const newDataset = datasets.filter(dataset => dataset.datasetPK.datasetId === name)[0] === undefined;

        json.datasetImpl = file.contents.toString();
        json.datasetDescription = fluigRestParams.datasets[name];
        json.datasetPK = {
          datasetId: name,
          companyId: fluigRestParams.companyId
        };

        const options = {
          uri: hasTheDatasetChangedUrl,
          method: 'POST',
          json
        };

        // exportDataset(options, newDataset);

        (function (o, n) { // lets create a function who has a single argument "test"
          // inside this function test will refer to the functions argument
          // not the var test from the loop above
          exportDataset(o, n);
        })(options, newDataset);

      }));
  });
};

function exportDataset(opt, ndt) {

  console.log(opt.json.datasetDescription, ndt)
  request(opt, function (error, response, body) {
    console.log(error, body);
    if (!error && response.statusCode == 200) {
      if (body.content) {
        console.log('O dataset sofreu alterações');
      } else {
        opt.uri = ndt ? createDataset : editDataset;

        console.log(opt.json.datasetDescription);
        request(opt, function (error, response, body) {
          console.log(error, body);
        });
      }
    }
  });
}
