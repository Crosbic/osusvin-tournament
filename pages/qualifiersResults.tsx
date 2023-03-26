import axios from 'axios'
import { useEffect, useState } from 'react'

const QualifiersResults = () => {
  const resultLinksIds = [107569429, 107570700, 107573142, 107576151]
  const [rows, setRows] = useState<any>()

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          'https://osu.ppy.sh/api/get_match?k=4fd5c1e071a9244f8c4bdd4ac3ea4652c452ab6b&mp=107569429'
        )
        .then((res) => res.data)
        .then((data) => {
          setRows(data)
        })
    }
    fetchData()
  })

  return rows.map((row: any) => {
    console.log(row)
  })
}

export default QualifiersResults
