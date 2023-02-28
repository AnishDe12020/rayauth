import axios from "axios"
import { userConstructor } from "../classes"
import { BASEURL } from "../constants"



export  function getUser(jwt: string, setUser: userConstructor | null) {
 axios.get(`${BASEURL}/user`, {
    headers: {
        "Authorization": `Bearer ${jwt}`
    }
 }).then(data => {
    if(data.status == 200) {
      if(setUser == null) return;
        setUser.id = data.data.user,
        setUser.createdAt = data.data.createdAt,
        setUser.updatedAt = data.data.updatedAt,
        setUser.email = data.data.email,
        setUser.address = data.data.address,
        setUser.avatar = data.data.avatar
      
      return
    }else {
        console.log(data.data)
        console.log("err", data.status)
        setUser = null
        return
    }
 }).catch(err => {
   setUser = null
   console.log(err);
   return
 })
}


// model User {
//     id            String          @id @default(auto()) @map("_id") @db.ObjectId
//     createdAt     DateTime        @default(now())
//     updatedAt     DateTime        @updatedAt
//     email         String          @unique
//     address       String          @unique
//     name          String?
//     avatar        String?
//     bio           String?
//     twitter       String?
//     metadata      Json?
//     Project       Project[]
//     ProjectMember ProjectMember[]
//     ClientSecret  ClientSecret[]
//     Session       Session[]
//   }