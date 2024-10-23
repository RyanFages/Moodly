import axios from "axios";

const SendUserMood = (mood, userInfo) => {
    const PutUrl = "puturl.com";
    const GetUrl = "geturl.com";

    // Check if data allready exist for the user today
    axios
        .get(GetUrl)
        .then((response) => {
            if (response.data.length === 0) {
                // If not exist, create new data
                axios
                    .put(PutUrl, userInfo)
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            // Update data
            axios
                .post(PutUrl, mood)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
};

export default SendUserMood;
