import axios from 'axios';

const fetcher = (url: string) =>
  axios
    .get(url, {
      // 쿠키를 백에서 프론트에 전송
      withCredentials: true,
    })
    .then((response) => response.data);

export default fetcher;
