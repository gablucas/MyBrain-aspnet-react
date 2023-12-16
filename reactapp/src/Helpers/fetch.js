import MyFetch from "../Axios/config";

const getDb = async (endpoint, setState) => {
  const response = await MyFetch(endpoint);
  const data = response.data;
  setState(data);
}

const postDb = async (endpoint, obj) => {
  await MyFetch.post(endpoint, obj)
    .then(function (response) {
        console.log(response)
        // window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
}

const putDb = async (endpoint, obj) => {
  await MyFetch.put(endpoint, obj)
    .then(function (response) {
      console.log(response)
      // window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
}

const deleteDb = async (endpoint) => {
  await MyFetch.delete(endpoint)
    .then(function (response) {
      console.log(response)
      // window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
}

export { getDb, postDb, putDb, deleteDb };