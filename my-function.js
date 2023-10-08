export const handler = async (event) => {
    // TODO implement
    const keyword = event.queryStringParameters.keyword;
    const response = {
      statusCode: 200,
      body: (`Sonu Basnet says ${keyword}`),
    };
    return response;
  };
  
  
  