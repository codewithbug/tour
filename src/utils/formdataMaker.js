const makeFormdata = function(data) {

    let formData = new FormData();

    var objKeys = Object.keys(data);

    objKeys.forEach(key => {


        // check if data is filelist
        if ( Array.isArray( data[key] ) ) {

            data[key].forEach(file => {

                formData.append(key, file);
            })
        } else {

            formData.append(key, data[key]);
        }

    })

    return formData;
}


module.exports = makeFormdata;