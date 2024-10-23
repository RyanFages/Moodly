import axios from "axios";

const GetTeamMood = () => {
    const Url = "geturl.com"
    axios.fetch(Url)
    .then((response) => {
        console.log(response.data)
    }).catch((error) => {
        console.log(error)
    })
}

export default GetTeamMood;