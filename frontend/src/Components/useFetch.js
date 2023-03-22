import { useState, useEffect } from 'react';

const UseFetch = (url) => {
      const [Obj, setObj] = useState(null);
      const [err, setErr] = useState(false);

      const DataFetch=async ()=>{
            fetch(url)
                  .then(res => {
                        if (!res.ok) {
                              throw Error("Error in fetching the data");
                        }
                        return res.json();
                  })
                  .then(data => {
                        setObj(data);
                        setErr(null);
                  })
                  .catch((err) => {
                        if (err.name === 'AbortError') {
                              console.log("Fetch aborted");
                        }
                        else {
                              setErr(err.message);
                        }
                  })
      }

      useEffect(() => {
            DataFetch();
            //return ()=>abortCon.abort();
      }, [url]);

      return { Obj, err };
}

export default UseFetch;