import { useSelector } from "react-redux";

const GetUserMood = async () => {
    const User = useSelector((state) => state.User);
    const jwt = useSelector((state) => state.jwt);

    try {
        const response = await axios.get("http://api.getMoodbyuser", {
            headers: {
                Authorization: `Bearer ${jwt}`,
                userID: User.id,
            },
        });
        const data = response.data;
        console.log("GetUserMood : ", data);
    } catch (error) {
        console.log("An error occurred:", error.response);
    }
};

export default GetUserMood;
