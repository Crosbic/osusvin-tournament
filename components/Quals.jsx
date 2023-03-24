import styles from '../styles/Home.module.css'
import { useState, useEffect } from "react";

const Quals = () => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  class OsuMatchParser {

    mode;
    _mode_exemple = {//clear that
      strictMPool: true,//count only mappool listed maps
      apiV1Key: "some_key"
    }
    matchLinks;
    mPool;
    allScores = {};

    constructor(mode, mLinks, mPool) {
      this.mode = mode;
      this.matchLinks = mLinks;
      if (mode.strictMPool) {
        if (!mPool) throw new Error();
        this.mPool = mPool;
      } else {
        this.mPool = undefined
      }
    }
    async parse() {

      if (this.mode.apiV1Key) {
        console.log("API MODE")
        return await this.parseWithApi();
      } else {
        console.log("LINK MODE")
        throw new Error("Link mode not supported, use api mode!")
      }
    }
    async parseWithApi() {
      let userMatches = [];
      for (let link of this.matchLinks) {
        let matchID = link.split("/")[5]
        try {
          const response = await fetch(`https://osu.ppy.sh/api/get_match?k=${this.mode.apiV1Key}&mp=${matchID}`, {
            method: 'GET',
          });
          if (!response.ok) {
            throw new Error("HTTP status " + response.status);
          }
          const result = await response.json();
          let matchGames = result.games;
          for (let game of matchGames) {
            if (!this.checkBeatmap(+game.beatmap_id)) continue;
            for (let score1 of game.scores) {
              let score = {
                beatmap_id: game.beatmap_id,
                mods: game.mods,
                scoreValue: score1.score
              };
              //console.log(score)
              let user = userMatches.find(function (match) {
                return match.user.id === score1.user_id;
              })
              //console.log(user)
              if (user) {
                //existing user
                user.scores.push(score);
              } else {
                user = new UserMatch({
                  id: score1.user_id,
                  username: undefined,
                  avatar_url: undefined,
                });
                user.scores.push(score);
                userMatches.push(user);
              }
              //creating all scores map
              if (this.allScores[`${game.beatmap_id}`]) {
                this.allScores[`${game.beatmap_id}`].push({
                  user_id: score1.user_id,
                  score: score1.score,
                  mods: game.mods
                })
              } else {
                this.allScores[`${game.beatmap_id}`] = [{
                  user_id: score1.user_id,
                  score: score1.score,
                  mods: game.mods

                }]
              }


            }
          }
        } catch (e) {
          console.error(e);
          userMatches = -1
        }
      }
      return userMatches;
    }
    checkBeatmap(baetmapId) {
      if (this.mode.strictMPool) {
        return this.mPool.includes(baetmapId)
      } else {
        return true
      }
    }
  }
  class UserMatch {
    user
    scores = []

    constructor(user) {
      this.user = {
        id: user.id,
        username: user.username,
        avatar_url: user.avatar_url
      }
    }
    getScoresByMods() {
      let scoresByMods = {
        "NF": 0,
        "NFHD": 0,
        "NFHR": 0,
        "NFDT": 0,
      }
      for (let score of this.scores) {
        let strMods;
        if (typeof score.mods === "string") {
          strMods = +score.mods == 1 ? "NF" : +score.mods == 9 ? "NFHD" : +score.mods == 17 ? "NFHR" : +score.mods == 65 ? "NFDT" : ""
        } else {
          let strMods = score.mods.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            ""
          );
        }

        scoresByMods[`${strMods}`] += +score.scoreValue;
      }
      return scoresByMods


    }
  }
  let osuMParser = new OsuMatchParser({
    strictMPool: false,
    apiV1Key: ""
  },
    ["https://osu.ppy.sh/community/matches/107520719",
      "https://osu.ppy.sh/community/matches/107535652"
    ]);
  useEffect(() => {
    setLoading(true)
    osuMParser
      .parse()
      .then((res) => {
        setData(res)
        setLoading(false)
        console.log(res);
      });
  }, [])

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>
  }
  return (
    <div>
      {data.map(match => (
        <div key={match.user.id}>
          <p>{match.user.id}</p>
          {match.scores.map(score => (
               <p>{score.beatmap_id}
               {score.mods}
               {score.scoreValue}</p>               
          ))}
         
        </div>
      ))}
    </div>
  )

}

export default Quals
