async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function getData(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'      
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function updateData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'PUT', // GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function deleteData(url = '') {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'DELETE', // GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}