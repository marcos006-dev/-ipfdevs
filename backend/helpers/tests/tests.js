export const testGet = async (url, tituloTest, statusRespuesta, server, headers, debug = false) => {
  await test(tituloTest, async () => {
    let response;
    if (!headers) {
      response = await server.get(url);
    } else {
      response = await server.get(url).set(headers);
    }
    if (debug) {
      console.log(response.body);
    }

    expect(response.statusCode).toEqual(statusRespuesta);
    expect(response.type).toEqual("application/json");
  });
};

export const testPost = async (url, tituloTest, formData, statusRespuesta, server, headers, debug = false) => {
  await test(tituloTest, async () => {
    let response;

    if (!headers) {
      response = await server.post(url);
    } else {
      response = await server.post(url).set(headers)
        .set("content-type", "application/json")
        .send(formData);
    }
    if (debug) {
      console.log(response.body);
    }
    // console.log(response);
    expect(response.statusCode).toEqual(statusRespuesta);
    expect(response.type).toEqual("application/json");
  });
};

export const testPut = async (url, tituloTest, formData, statusRespuesta, server, headers, debug = false) => {
  await test(tituloTest, async () => {
    let response;
    if (!headers) {
      response = await server.put(url);
    } else {
      response = await server.put(url).set(headers)
        .set("content-type", "application/json")
        .send(formData);
    }
    if (debug) {
      console.log(response.body);
    }
    expect(response.statusCode).toEqual(statusRespuesta);
    expect(response.type).toEqual("application/json");
  });
};

export const testDelete = async (url, tituloTest, statusRespuesta, server, headers, debug = false) => {
  await test(tituloTest, async () => {
    let response;
    if (!headers) {
      response = await server.delete(url);
    } else {
      response = await server.delete(url).set(headers);
    }
    if (debug) {
      console.log(response.body);
    }
    expect(response.statusCode).toEqual(statusRespuesta);
    expect(response.type).toEqual("application/json");
  });
};
