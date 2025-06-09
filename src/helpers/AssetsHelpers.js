import Geocode from 'react-geocode';

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function removeValue(list, value) {
  // Split the list into an array of values
  var values = list.split(',');

  // Remove the specified value from the array
  var updatedValues = values.filter(function (item) {
    return item.trim() !== value.toString().trim();
  });

  // Join the updated values back into a string
  var updatedList = updatedValues.join(',');

  return updatedList;
}

export function addValue(list, value) {
  if (list) {
    let listArr = String(list).split(',');
    listArr.push(value);
    return listArr.toString();
  } else {
    let listArr = [];
    listArr.push(value);
    return listArr.toString();
  }
}

// remove spacial character and space and concat with '_'
// ex. help & support => help__support
export function removeSpacialChar(str) {
  return String(str).replace(/[&/\\#, +()$~%.'":*?<>{}]/g, '_');
}

export function removeCSSClass(ele, cls) {
  const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
  ele.className = ele.className.replace(reg, ' ');
}

export function addCSSClass(ele, cls) {
  ele.classList.add(cls);
}

export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;

export function capitalizeFirstLetter(string) {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
}

export function createLocation(address_components) {
  let city = '';
  let pincode = '';
  for (let i = 0; i < address_components.length; i++) {
    for (let j = 0; j < address_components[i].types.length; j++) {
      switch (address_components[i].types[j]) {
        case 'locality':
          city = address_components[i].long_name;
          break;
        case 'postal_code':
          pincode = address_components[i].long_name;
          break;
      }
    }
  }

  return { city: city, pincode: pincode };
}

export function getSheetData(data, header) {
  var fields = Object.keys(data[0]);
  var sheetData = data.map(function (row) {
    return fields.map(function (fieldName) {
      return row[fieldName] ? row[fieldName] : '';
    });
  });
  sheetData.unshift(header);
  return sheetData;
}

export const setCurrentLocationFunc = async (loc) => {
  let result = {};
  if (loc && Array.isArray(loc?.coordinates) && loc?.coordinates?.length) {
    Geocode.setApiKey(process.env.googleMapApi);
    Geocode.setLocationType('ROOFTOP');
    Geocode.setLanguage('en');

    let lng = loc?.coordinates[0];
    let lat = loc?.coordinates[1];

    try {
      let response = await Geocode.fromLatLng(lat, lng);

      let formatted_address = response.results[0].formatted_address;
      let address_components = response.results[0].address_components;

      let city = '';
      for (let i = 0; i < address_components.length; i++) {
        for (let j = 0; j < address_components[i].types.length; j++) {
          switch (address_components[i].types[j]) {
            case 'locality':
              city = address_components[i].long_name;
              break;
          }
        }
      }
      result = { address: formatted_address, city: city };
    } catch (error) {
      console.log(error);
    }
    return result;
  } else {
    return null;
  }
};
