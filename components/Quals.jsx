import styles from '../styles/Home.module.css'
import axios from 'axios'
import useSWR from 'swr';

const fetcher = (url) => axios(url).then((res) => {  
  return JSON.parse(res.data);
});

const Quals = () => { 
  const { data, error } = useSWR('/api/staticdata', fetcher);
  if (error) return <div className={styles.loading}>Failed to load</div>; 
  if (!data) return <div>Loading...</div>;
  console.log("data");
  console.log(data);
 return (
    <div>
      <h1>JSON data</h1>
      {data.map((userMatch)=>{
        return(
          <ul>
          <li>ID: {userMatch.user.username}</li>
          <li>NoMod score: {userMatch.scoresByMods.NF}</li>
          <li>Hidden score: {userMatch.scoresByMods.NFHD}</li>
          <li>HardRock score: {userMatch.scoresByMods.NFHR}</li>
          <li>Double Time score: {userMatch.scoresByMods.NFDT}</li>          
        </ul>
        )
      })}      
    </div>
  );

}

export default Quals
