import { NextApiRequest,NextApiResponse } from "next"

export default(request:NextApiRequest,response:NextApiResponse)=>{
    const users=[
        {id:1,name:'calebe tadeu'},
        {id:2, name:'Lucy Rosane'},
        {id:3,name:'Josue Tadeu'},

]

    return response.json(users)
}