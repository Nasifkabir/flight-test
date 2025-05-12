
const customFetch = async (url: string, body: any) => {
  const base_url = "https://serviceapi.innotraveltech.com";
  const secret_code = "dxbz4eCVjJ5U6TevfIUqMVD1LbMG3eWfLdJ14qjQZRy5j";
  const api_key = "S10944771678913327924";
  
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    secretecode: secret_code,
    apikey: api_key,
  };
  
  try {
    const res = await fetch(`${base_url}${url}`, {
      method: "POST",
      cache: "no-store",
      headers: headers,
      body: JSON.stringify(body),
    });
    
    if (!res.ok) {
      return {
        error: true,
        message: "Failed to fetch data",
      };
    } else {
      const jsonData = await res.json();
      return {
        error: false,
        message: "Data fetched successfully",
        data: jsonData,
      };
    }
  } catch (error) {
    return {
      error: true,
      message: "An error occurred while fetching data",
    };
  }
};

export default customFetch;
